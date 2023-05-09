package com.ssafy.onu.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "functionality")
public class Functionality {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int functionalityId;

    @Column
    private String functionalityName;
}
