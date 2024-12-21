package com.example.PBEvaluation.service;

import com.example.PBEvaluation.model.Client;
import com.example.PBEvaluation.model.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class EvaluationService {
    @Autowired
    RestTemplate restTemplate;

    public Client getClientByRut(String clientRut) {
        return restTemplate.getForObject("http://PBClient/app/micro/clients/" + clientRut, Client.class);
    }

    public Optional<Request> getRequestById(Long id) {
        try {
            Request request = restTemplate.getForObject("http://PBRequest/app/micro/requests/" + id, Request.class);
            return Optional.ofNullable(request); // Retorna un Optional
        } catch (Exception e) {
            return Optional.empty(); // Devuelve un Optional vacío en caso de error
        }
    }

    public Request saveRequest(String clientRut, Request request){
        request.setRut(clientRut);
        HttpEntity<Request> newRequest = new HttpEntity<Request>(request);
        Request requestNew = restTemplate.postForObject("http://PBRequest/app/micro/requests/", newRequest, Request.class);
        return requestNew;
    }

    //Realiza la simulación del prestamo para el usuario
    //Realiza el calculo de las cuotas mensuales
    public int getMonthlyPayments(Request request){
        double m = 0;
        int M = 0; //M Cuota mensual
        int P = request.getAmount(); //P Monto préstamo
        double r = (request.getInterest() / 12) / 100; //r Tasa de interés mensual (Tasa anual/12/100)
        int n = request.getTime() * 12; //n Número total de pagos (Plazo en años * 12)

        m = P * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
        M = (int) Math.round(m);
        return M;
    }

    //Realiza el calculo de la relación Cuota/Ingreso
    public void getPaymentsSalary(Client client, Request request){
        if(request.getState() == 3){//Si la solicitud esta en estado 3.-En evaluación
            double R = 0;
            int salary = client.getSalary();//Se obtienen los ingresos mensuales
            int payments = getMonthlyPayments(request);//Se obtiene la cuota mensual

            R = (payments / salary) * 100;//Calculo de relación Cuota/Ingreso

            if(R > 35.0){//Si sobrepasa el umbral del banco
                request.setState(7);//Se rechaza la solicitud, estado 7.-Rechazada
            }
        }
    }

    //Revisa la antiguedad laboral y su estabilidad
    public void checkJob(Client client, Request request){
        if(request.getState() == 3){
            if(client.isFreelance() == false){//Si no es independiente
                if(client.getSeniority() == 0){
                    request.setState(7);
                }
            }
            else{//Si es independiente
                if(client.isStable() == false){//No tiene estabilidad financiera
                    request.setState(7);
                }
            }
        }
    }

    //Realiza el calculo de la relación Deuda/Ingreso
    public void getDebtSalary(Client client, Request request){
        if(request.getState() == 3) {
            if (client.isLatePayment() == true) {//Si es que tiene deudas
                int debts = client.getDebt() + getMonthlyPayments(request);//Deudas + Cuota mensual
                int salary = client.getSalary();
                double R = salary * 0.5;

                if(debts > R){
                    request.setState(7);
                }
            }
        }
    }

    //Revisa la capacidad de ahorro
    public void savingsCapacity(Client client, Request request){
        int C = 0;
        double ten = request.getAmount() * 0.1;//10% del monto del préstamo solicitado
        double twenty = request.getAmount() * 0.2;//20% del monto del préstamo solicitado
        double thirty = client.getSaved() * 0.3;//30% del saldo de su cuenta
        double fifty = client.getSaved() * 0.5;//50% del saldo de su cuenta
        double five = client.getSalary() * 0.05;//5% de sus ingresos mensuales

        if(request.getState() == 3){
            //Saldo Mínimo Requerido
            if(client.getSaved() >= ten){
                C = C + 1;
            }

            //Historial de Ahorro Consistente
            if(client.getSaved() > 0){
                if(client.getRetreats() <= fifty){
                    C = C + 1;
                }
            }

            //Depósitos Periódicos
            if(client.getDeposits() >= five){//Depósitos últimos 12 meses
                C = C + 1;
            }

            //Relación Saldo/Años de Antigüedad
            if(client.getCSaved() < 2 && client.getSaved() >= twenty){//Menos de 2 años en su cuenta de ahorros
                C = C + 1;
            } else if (client.getCSaved() >= 2 && client.getSaved() >= ten) {//2 años o más con la cuenta
                C = C + 1;
            }

            //Retiros Recientes
            if(client.getRecentRetreats() <= thirty){//Retiros últimos 6 meses
                C = C + 1;
            }
        }

        if(C == 5){
            request.setState(4);//La solicitud esta en estado 4.-Pre-Aprobada
        } else if (C < 2) {
            request.setState(7);
        }
    }

    //Calcula los costos totales
    public int getTotalCosts(Client client, Request request){
        int M = getMonthlyPayments(request);//Cuota mensual

        double sd = request.getAmount() * 0.0003;//Seguro de desgravamen (Mensual)
        int SD = (int) Math.round(sd);

        int SI = 20000;//Seguro de incendios (Mensual)

        double ca = request.getAmount() * 0.01;//Comisión por administración (cobro inicial)
        int CA = (int) Math.round(ca);

        int CM = M + SD + SI;//Costo mensual
        int CT = (CM * (request.getTime() * 12)) + CA;//Costo total que se presentara al cliente
        return CT;
    }

    public Request evaluateRequest(Long id) {
        Request request = getRequestById(id)
                .orElseThrow(() -> new NoSuchElementException("Solicitud no encontrada con id " + id));

        Client client = getClientByRut(request.getRut());
        if (client == null) {
            throw new NoSuchElementException("Cliente no encontrado con rut " + request.getRut());
        }

        // Ejecutar la evaluación
        int monthlyPayments = getMonthlyPayments(request);
        getPaymentsSalary(client, request);
        checkJob(client, request);
        getDebtSalary(client, request);
        savingsCapacity(client, request);

        saveRequest(client.getRut(), request);

        // Retornar la solicitud actualizada
        return request;
    }

    public int calculateTotalCost(Long id) {
        Request request = getRequestById(id)
                .orElseThrow(() -> new NoSuchElementException("Solicitud no encontrada con id " + id));

        if (request.getState() != 4) {
            throw new IllegalStateException("La solicitud debe estar en estado 'Pre-aprobada' para calcular el costo total.");
        }

        Client client = getClientByRut(request.getRut());
        if (client == null) {
            throw new NoSuchElementException("Cliente no encontrado con rut " + request.getRut());
        }

        // Calcular el costo total
        int totalCost = getTotalCosts(client, request);
        return totalCost;
    }
}