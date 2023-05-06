package com.ssafy.onu.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Getter
@DynamicInsert
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "nutrient")
public class Nutrient {

    @Id
    private Long nutrientId;

    @Column
    private String nutrientName;

    @Column
    private String nutrientImageURl;

    @Column
    private String nutrientBrand;

    @Column
    private String nutrientIntake;

    @Column
    private String nutrientCaution;

    @Column
    private String nutrient_expiration;

    @Column
    private String nutrient_material;
}
