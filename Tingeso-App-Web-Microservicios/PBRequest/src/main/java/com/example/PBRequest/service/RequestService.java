package com.example.PBRequest.service;

import com.example.PBRequest.entity.Request;
import com.example.PBRequest.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RequestService {
    @Autowired
    RequestRepository requestRepository;

    public ArrayList<Request> getRequests(){
        return (ArrayList<Request>) requestRepository.findAll();
    }

    public Request getRequestById(Long id){
        return requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));
    }

    public List<Request> getRequestsByRut(String rut){
        return requestRepository.findByRut(rut);
    }

    public Request saveRequest(Request request){
        return requestRepository.save(request);
    }

    public Request updateRequest(Request request, Long id) {
        Request requestUpdated = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        requestUpdated.setState(request.getState());
        return requestRepository.save(requestUpdated);
    }
}