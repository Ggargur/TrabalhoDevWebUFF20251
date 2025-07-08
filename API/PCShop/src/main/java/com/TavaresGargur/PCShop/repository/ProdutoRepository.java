package com.TavaresGargur.PCShop.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.TavaresGargur.PCShop.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    Page<Produto> findByCategoriaId(Long categoriaId, Pageable pageable);
}
