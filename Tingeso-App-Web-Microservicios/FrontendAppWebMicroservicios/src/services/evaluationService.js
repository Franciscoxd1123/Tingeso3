import httpClient from "../http-common";

// Calcular pagos mensuales para una solicitud
const calculateMonthlyPayments = (data) => {
    return httpClient.post("/app/micro/evaluation/monthlyPayments", data);
}

// Evaluar solicitud por ID
const evaluateRequest = (id) => {
    return httpClient.get(`/app/micro/evaluation/${id}`);
}

// Obtener el costo total de la evaluación por ID
const totalCost = (id) => {
    return httpClient.get(`/app/micro/evaluation/totalCost/${id}`);
}

export default { calculateMonthlyPayments, evaluateRequest, totalCost };