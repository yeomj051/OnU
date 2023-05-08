package com.ssafy.onu.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Table(name = "taking_date")
public class TakingDate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "taking_date_id")
    private int takingDateId;

    @Column(name = "taking_date_date")
    private String takingDateDate;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User userId;
}
