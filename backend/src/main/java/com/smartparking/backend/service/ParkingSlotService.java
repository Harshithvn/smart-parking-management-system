package com.smartparking.backend.service;

import com.smartparking.backend.model.ParkVehicleRequest;
import com.smartparking.backend.model.ParkingSession;
import com.smartparking.backend.model.ParkingSlot;
import com.smartparking.backend.repository.ParkingSessionRepository;
import com.smartparking.backend.repository.ParkingSlotRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ParkingSlotService {

    private final ParkingSlotRepository repository;
    private final ParkingSessionRepository parkingSessionRepository;

    // ===== TOTAL REVENUE =====
    private double totalRevenue = 0;

    public ParkingSlotService(
            ParkingSlotRepository repository,
            ParkingSessionRepository parkingSessionRepository
    ) {
        this.repository = repository;
        this.parkingSessionRepository = parkingSessionRepository;
    }

    // ================= USER =================

    public List<ParkingSlot> getAllSlots() {
        return repository.findAll();
    }

    // ================= PARK =================

    public ParkingSlot parkVehicle(Long id, ParkVehicleRequest request) {

        ParkingSlot slot = repository.findById(id).orElseThrow();

        slot.setOccupied(true);
        slot.setEntryTime(LocalDateTime.now());
        slot.setExitTime(null);
        slot.setFee(0);

        repository.save(slot);

        ParkingSession session = new ParkingSession();

        session.setVehicleNumber(request.getVehicleNumber());
        session.setOwnerName(request.getOwnerName());
        session.setVehicleType(request.getVehicleType());
        session.setSlotNumber(request.getSlotNumber());

        session.setEntryTime(LocalDateTime.now());
        session.setExitTime(null);

        session.setParkingFee(0.0);
        session.setActive(true);

        parkingSessionRepository.save(session);

        return slot;
    }

    // ================= EXIT =================

    public ParkingSlot exitVehicle(Long id) {

        ParkingSlot slot = repository.findById(id).orElseThrow();

        LocalDateTime exitTime = LocalDateTime.now();

        slot.setExitTime(exitTime);

        long hours = Duration.between(
                slot.getEntryTime(),
                exitTime
        ).toHours();

        if (hours == 0) {
            hours = 1;
        }

        double fee = calculateFee(slot.getSlotType(), hours);

        slot.setFee(fee);
        slot.setOccupied(false);

        totalRevenue += fee;

        ParkingSession session = parkingSessionRepository
                .findByVehicleNumberAndActiveTrue(
                        parkingSessionRepository
                                .findByActiveTrue()
                                .stream()
                                .filter(s -> s.getSlotNumber().equals(slot.getSlotNumber()))
                                .findFirst()
                                .orElseThrow()
                                .getVehicleNumber()
                )
                .orElse(null);

        if (session != null) {

            session.setExitTime(exitTime);

            session.calculateDuration();

            session.setParkingFee(fee);

            session.setActive(false);

            parkingSessionRepository.save(session);
        }

        return repository.save(slot);
    }

    // ================= RESET =================

    public void resetAllSlots() {

        List<ParkingSlot> slots = repository.findAll();

        for (ParkingSlot slot : slots) {

            slot.setOccupied(false);
            slot.setEntryTime(null);
            slot.setExitTime(null);
            slot.setFee(0);

        }

        repository.saveAll(slots);

    }

    // ================= REVENUE =================

    public double getTotalRevenue() {
        return totalRevenue;
    }

    // ================= FEE =================

    private double calculateFee(String type, long hours) {

        return switch (type.toUpperCase()) {

            case "BIKE" -> hours * 20;

            case "CAR" -> hours * 40;

            case "AUTO" -> hours * 30;

            case "TRUCK" -> hours * 70;

            case "BUS" -> hours * 100;

            default -> hours * 50;

        };

    }

}