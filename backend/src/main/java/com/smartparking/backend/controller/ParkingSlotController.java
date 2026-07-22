package com.smartparking.backend.controller;

import com.smartparking.backend.model.ParkVehicleRequest;
import com.smartparking.backend.model.ParkingSlot;
import com.smartparking.backend.service.ParkingSlotService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ParkingSlotController {

    private final ParkingSlotService service;

    public ParkingSlotController(ParkingSlotService service) {
        this.service = service;
    }

    // ================= USER APIs =================

    @GetMapping("/slots")
    public List<ParkingSlot> getAllSlots() {
        return service.getAllSlots();
    }

    @PostMapping("/park/{id}")
    public ParkingSlot park(
            @PathVariable Long id,
            @RequestBody ParkVehicleRequest request
    ) {
        return service.parkVehicle(id, request);
    }

    @PostMapping("/exit/{id}")
    public ParkingSlot exit(@PathVariable Long id) {
        return service.exitVehicle(id);
    }

    // ================= ADMIN APIs =================

    @PostMapping("/admin/reset")
    public String resetAllSlots() {
        service.resetAllSlots();
        return "All parking slots reset successfully";
    }

    @GetMapping("/admin/revenue")
    public double getTotalRevenue() {
        return service.getTotalRevenue();
    }
}