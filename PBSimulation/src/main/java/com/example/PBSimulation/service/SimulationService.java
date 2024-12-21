package com.example.PBSimulation.service;

import com.example.PBSimulation.model.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class SimulationService {
    @Autowired
    RestTemplate restTemplate;

    public int getMonthlyPayments(Request request) {
        return restTemplate.postForObject("http://PBEvaluation/app/micro/evaluation/monthlyPayments", request, Integer.class);
    }
}