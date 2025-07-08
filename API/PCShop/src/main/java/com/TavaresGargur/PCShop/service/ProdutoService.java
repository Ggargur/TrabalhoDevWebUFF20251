package com.TavaresGargur.PCShop.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.TavaresGargur.PCShop.model.Produto;
import com.TavaresGargur.PCShop.repository.ProdutoRepository;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public Optional<Produto> buscarPorId(Long id) {
        return produtoRepository.findById(id);
    }

    public Produto salvar(Produto produto) {
        return produtoRepository.save(produto);
    }

    public void deletar(Long id) {
        produtoRepository.deleteById(id);
    }

    public Page<Produto> listarTodosPaginado(Pageable pageable) {
        return produtoRepository.findAll(pageable);
    }

    public Page<Produto> listarPorCategoria(Long categoriaId, Pageable pageable) {
        return produtoRepository.findByCategoriaId(categoriaId, pageable);
    }
}
