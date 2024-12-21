package com.example.PBSimulation.controller;

import com.example.PBSimulation.model.Request;
import com.example.PBSimulation.service.SimulationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/app/micro/simulation")
public class SimulationController {
    @Autowired
    SimulationService simulationService;

    @PostMapping("/")
    public ResponseEntity<Integer> simulation(@RequestBody Request request) {
        int monthlyPayments = simulationService.getMonthlyPayments(request);
        return ResponseEntity.ok(monthlyPayments);
    }
}