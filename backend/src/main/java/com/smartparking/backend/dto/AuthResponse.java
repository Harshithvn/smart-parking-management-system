package com.smartparking.backend.dto;

public class AuthResponse {

    private boolean success;
    private String message;
    private JwtResponse jwtResponse;

    public AuthResponse() {
    }

    public AuthResponse(boolean success, String message, JwtResponse jwtResponse) {
        this.success = success;
        this.message = message;
        this.jwtResponse = jwtResponse;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public JwtResponse getJwtResponse() {
        return jwtResponse;
    }

    public void setJwtResponse(JwtResponse jwtResponse) {
        this.jwtResponse = jwtResponse;
    }
}