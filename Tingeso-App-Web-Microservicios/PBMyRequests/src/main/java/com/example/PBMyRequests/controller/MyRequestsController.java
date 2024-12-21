package com.example.PBMyRequests.controller;

import com.example.PBMyRequests.model.Request;
import com.example.PBMyRequests.model.Client;
import com.example.PBMyRequests.service.MyRequestsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/app/micro/myrequests")
public class MyRequestsController {
    @Autowired
    MyRequestsService myRequestsService;

    @GetMapping("/{clientRut}")
    public ResponseEntity<List<Request>> getRequests(@PathVariable("clientRut") String clientRut){
        Client client = myRequestsService.getClientByRut(clientRut);
        if(client == null)
            return ResponseEntity.notFound().build();
        List<Request> requests = myRequestsService.getRequests(clientRut);
        return ResponseEntity.ok(requests);
    }
}