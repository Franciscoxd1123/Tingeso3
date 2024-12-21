import httpClient from "../http-common";

// Realizar simulación para calcular los pagos mensuales
const simulation = (data) => {
    return httpClient.post("/app/micro/simulation/", data);
}

export default { simulation };