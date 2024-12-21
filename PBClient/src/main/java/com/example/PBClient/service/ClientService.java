package com.example.PBClient.service;

import com.example.PBClient.entity.Client;
import com.example.PBClient.model.Request;
import com.example.PBClient.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class ClientService {

    @Autowired
    ClientRepository clientRepository;

    @Autowired
    RestTemplate restTemplate;

    public Client saveClient(Client client){
        return clientRepository.save(client);
    }

    public Client getClientByRut(String rut){
        return clientRepository.findByRut(rut);
    }

    public List<Request> getRequests(String clientRut){
        List<Request> requests = restTemplate.getForObject("http://PBRequest/app/micro/requests/rut/" + clientRut, List.class);
        return requests;
    }

    public Request saveRequest(String clientRut, Request request){
        request.setRut(clientRut);
        HttpEntity<Request> newRequest = new HttpEntity<Request>(request);
        Request requestNew = restTemplate.postForObject("http://PBRequest/app/micro/requests/", newRequest, Request.class);
        return requestNew;
    }
}