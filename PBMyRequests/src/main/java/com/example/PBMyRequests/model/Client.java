package com.example.PBMyRequests.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Client {
    private Long id;
    private String name; //Nombre
    private String lastName; //Apellido
    private String rut; //Rut
    private int age; //Edad
    private int salary; //Salario o Ingresos
    private int saved; //Saldo cuenta de ahorros
    private int cSaved; //Antiguedad cuenta de ahorros (en años)
    private boolean latePayment; //Tiene deudas?
    private int debt; //Monto de deudas
    private boolean freelance; //Es independiente?
    private int seniority; //Antiguedad en el trabajo (en años)
    private boolean stable; //Es estable?
    private int retreats; //Retiros últimos 12 meses
    private int recentRetreats; //Retiros últimos 6 meses
    private int deposits; //Depósitos últimos 12 meses
}