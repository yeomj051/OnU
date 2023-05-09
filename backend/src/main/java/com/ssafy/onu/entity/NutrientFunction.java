package com.ssafy.onu.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "nutrient_function")
public class NutrientFunction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int nutrientFunctionId;

    @ManyToOne
    @JoinColumn(name = "function_id")
    private Functionality functionalityId;

    @ManyToOne
    @JoinColumn(name = "nutrient_id")
    private Nutrient nutrientId;
}
