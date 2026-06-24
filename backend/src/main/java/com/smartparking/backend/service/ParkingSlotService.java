package com.smartparking.backend.service;

import com.smartparking.backend.model.ParkingSlot;
import com.smartparking.backend.repository.ParkingSlotRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ParkingSlotService {

    private final ParkingSlotRepository repository;

    // ✅ TOTAL REVENUE (GLOBAL – NOT RESET)
    private double totalRevenue = 0;

    public ParkingSlotService(ParkingSlotRepository repository) {
        this.repository = repository;
    }

    // ===== USER =====
    public List<ParkingSlot> getAllSlots() {
        return repository.findAll();
    }

    // ===== PARK =====
    public ParkingSlot parkVehicle(Long id) {
        ParkingSlot slot = repository.findById(id).orElseThrow();

        slot.setOccupied(true);
        slot.setEntryTime(LocalDateTime.now());
        slot.setExitTime(null);
        slot.setFee(0);

        return repository.save(slot);
    }

    // ===== EXIT & BILLING =====
    public ParkingSlot exitVehicle(Long id) {
        ParkingSlot slot = repository.findById(id).orElseThrow();

        LocalDateTime exitTime = LocalDateTime.now();
        slot.setExitTime(exitTime);

        long hours = Duration.between(slot.getEntryTime(), exitTime).toHours();
        if (hours == 0) hours = 1;

        double fee = calculateFee(slot.getSlotType(), hours);

        slot.setFee(fee);
        slot.setOccupied(false);

        // ✅ ADD TO TOTAL REVENUE
        totalRevenue += fee;

        return repository.save(slot);
    }

    // ===== ADMIN: RESET (DOES NOT TOUCH REVENUE) =====
    public void resetAllSlots() {
        List<ParkingSlot> slots = repository.findAll();
        for (ParkingSlot slot : slots) {
            slot.setOccupied(false);
            slot.setEntryTime(null);
            slot.setExitTime(null);
            slot.setFee(0); // only last fee
        }
        repository.saveAll(slots);
    }

    // ===== ADMIN: GET REVENUE =====
    public double getTotalRevenue() {
        return totalRevenue;
    }

    // ===== FEE RULES =====
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