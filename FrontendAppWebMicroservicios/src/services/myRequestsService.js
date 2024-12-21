import httpClient from "../http-common";

// Obtener todas las solicitudes de un cliente por su RUT
const getRequestsByRut = (clientRut) => {
    return httpClient.get(`/app/micro/myrequests/${clientRut}`);
}

export default { getRequestsByRut };