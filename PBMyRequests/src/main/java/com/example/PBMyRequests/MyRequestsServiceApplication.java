package com.example.PBMyRequests;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class MyRequestsServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(MyRequestsServiceApplication.class, args);
	}
}