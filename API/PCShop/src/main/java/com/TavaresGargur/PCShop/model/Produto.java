package com.TavaresGargur.PCShop.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Column(length = 500)
    private String descricao;

    private BigDecimal preco;

    private Integer estoque;

    @Column(length = 500)
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;
}