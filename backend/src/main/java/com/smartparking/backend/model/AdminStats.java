package com.smartparking.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class AdminStats {

    @Id
    private Long id = 1L;   // single row only

    private double totalRevenue;

    public Long getId() {
        return id;
    }

    public double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
}
