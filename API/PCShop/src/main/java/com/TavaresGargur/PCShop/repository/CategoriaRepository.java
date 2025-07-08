package com.TavaresGargur.PCShop.repository;

import com.TavaresGargur.PCShop.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}
