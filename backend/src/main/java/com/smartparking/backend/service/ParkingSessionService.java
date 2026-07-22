package com.smartparking.backend.service;

import com.smartparking.backend.model.ParkingSession;
import com.smartparking.backend.repository.ParkingSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParkingSessionService {

    @Autowired
    private ParkingSessionRepository repository;

    public ParkingSession save(ParkingSession session) {
        return repository.save(session);
    }

    public List<ParkingSession> getAllSessions() {
        return repository.findAll();
    }

    public List<ParkingSession> getActiveSessions() {
        return repository.findByActiveTrue();
    }

    public ParkingSession findActiveVehicle(String vehicleNumber) {
        return repository
                .findByVehicleNumberAndActiveTrue(vehicleNumber)
                .orElse(null);
    }
}