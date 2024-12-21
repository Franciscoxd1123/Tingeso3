import httpClient from "../http-common";

// Obtener todas las solicitudes
const getAll = () => {
    return httpClient.get("/app/micro/requests/");
}

// Obtener solicitud por ID
const getId = id => {
    return httpClient.get(`/app/micro/requests/${id}`);
}

// Obtener solicitudes por RUT
const getRut = rut => {
    return httpClient.get(`/app/micro/requests/rut/${rut}`);
}

// Crear nueva solicitud
const create = data => {
    return httpClient.post("/app/micro/requests/", data);
}

// Actualizar solicitud por ID
const update = (id, data) => {
    return httpClient.put(`/app/micro/requests/${id}`, data);
}

export default { getAll, getId, getRut, create, update };