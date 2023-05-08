package com.ssafy.onu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ssafy.onu.entity.TakingDate;

import java.util.Date;
import java.util.List;

public interface TakingDateRepository extends JpaRepository<TakingDate, Date> {
    List<TakingDate> findByUserId_UserIdAndTakingDateDateContains(int userId, String date);
}
