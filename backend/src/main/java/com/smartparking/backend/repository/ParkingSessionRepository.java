package com.smartparking.backend.repository;

import com.smartparking.backend.model.ParkingSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ParkingSessionRepository extends JpaRepository<ParkingSession, Long> {

    Optional<ParkingSession> findByVehicleNumberAndActiveTrue(String vehicleNumber);

    List<ParkingSession> findByActiveTrue();

    List<ParkingSession> findByVehicleNumber(String vehicleNumber);
}