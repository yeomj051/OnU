package com.ssafy.onu.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "ingredient")
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ingredientId;

    private String ingredientName;

    @Builder
    public Ingredient(String ingredientName) {
        this.ingredientName = ingredientName;
    }
}
