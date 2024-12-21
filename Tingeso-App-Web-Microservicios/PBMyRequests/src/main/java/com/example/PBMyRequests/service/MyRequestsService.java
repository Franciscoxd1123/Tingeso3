package com.example.PBMyRequests.service;

import com.example.PBMyRequests.model.Client;
import com.example.PBMyRequests.model.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class MyRequestsService {

    @Autowired
    RestTemplate restTemplate;

    public List<Request> getRequests(String clientRut){
        List<Request> requests = restTemplate.getForObject("http://PBRequest/app/micro/requests/rut/" + clientRut, List.class);
        return requests;
    }

    public Client getClientByRut(String clientRut) {
        return restTemplate.getForObject("http://PBClient/app/micro/clients/" + clientRut, Client.class);
    }
}