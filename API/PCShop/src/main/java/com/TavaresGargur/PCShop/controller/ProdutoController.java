package com.TavaresGargur.PCShop.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.TavaresGargur.PCShop.model.Produto;
import com.TavaresGargur.PCShop.service.ProdutoService;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @GetMapping
    public Page<Produto> listarTodos(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id,asc") String[] sort) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(sort[0]).ascending());

        if (sort.length == 2 && sort[1].equalsIgnoreCase("desc")) {
            pageable = PageRequest.of(page, size, Sort.by(sort[0]).descending());
        }

        return produtoService.listarTodosPaginado(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarPorId(@PathVariable Long id) {
        return produtoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/categoria/{categoriaId}")
    public Page<Produto> listarPorCategoria(
            @PathVariable Long categoriaId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        return produtoService.listarPorCategoria(categoriaId, pageable);
    }

    @PostMapping
    public Produto criar(@RequestBody Produto produto) {
        return produtoService.salvar(produto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizar(@PathVariable Long id, @RequestBody Produto produto) {
        return produtoService.buscarPorId(id)
                .map(p -> {
                    produto.setId(id);
                    return ResponseEntity.ok(produtoService.salvar(produto));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (produtoService.buscarPorId(id).isPresent()) {
            produtoService.deletar(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
