package com.TavaresGargur.PCShop.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    private String nome;

    @OneToMany(mappedBy = "categoria")
    @Getter
    @Setter
    private List<Produto> produtos;
}
