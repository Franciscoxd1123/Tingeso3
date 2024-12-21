package com.example.PBSimulation.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Request {
    private Long id;
    private String rut; //Rut Cliente que solicita el préstamo
    private String type; //Tipo de préstamo
    private int amount; //Monto préstamo
    private float interest; //Tasa de interés anual
    private int time; //Plazo en años
    private int state; //Estado solicitud
}