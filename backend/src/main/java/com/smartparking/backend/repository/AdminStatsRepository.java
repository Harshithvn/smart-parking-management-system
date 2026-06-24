package com.smartparking.backend.repository;

import com.smartparking.backend.model.AdminStats;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminStatsRepository extends JpaRepository<AdminStats, Long> {
}
