import httpClient from "../http-common";

// Crear un nuevo cliente
const create = data => {
    return httpClient.post("/app/micro/clients/", data);
}

// Obtener cliente por su RUT
const getClientByRut = clientRut => {
    return httpClient.get(`/app/micro/clients/${clientRut}`);
}

// Obtener solicitudes de un cliente por su RUT
const getRequests = clientRut => {
    return httpClient.get(`/app/micro/clients/requests/${clientRut}`);
}

// Guardar una nueva solicitud para un cliente
const saveRequest = (clientRut, requestData) => {
    return httpClient.post(`/app/micro/clients/saverequest/${clientRut}`, requestData);
}

export default {
    create,
    getClientByRut,
    getRequests,
    saveRequest
};