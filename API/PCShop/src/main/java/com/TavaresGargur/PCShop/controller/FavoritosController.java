package com.TavaresGargur.PCShop.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.TavaresGargur.PCShop.model.Produto;
import com.TavaresGargur.PCShop.model.Usuario;
import com.TavaresGargur.PCShop.model.UsuarioDetails;
import com.TavaresGargur.PCShop.repository.ProdutoRepository;
import com.TavaresGargur.PCShop.repository.UsurarioRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/me/favoritos")
@RequiredArgsConstructor
public class FavoritosController {

    private final UsurarioRepository usuarioRepository;
    private final ProdutoRepository produtoRepository;

    @GetMapping
    public List<Produto> listarFavoritos() {
        return usuarioRepository.getReferenceById(getUsuarioLogado().getId()).getFavoritos();
    }

    @PostMapping("/{produtoId}")
    public ResponseEntity<?> adicionarFavorito(@PathVariable Long produtoId) {
        Usuario usuario = getUsuarioLogado();
        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado"));

        if (!usuario.getFavoritos().contains(produto)) {
            usuario.getFavoritos().add(produto);
            usuarioRepository.save(usuario);
        }

        return ResponseEntity.ok().build();
    }

    @Transactional
    @DeleteMapping("/{produtoId}")
    public ResponseEntity<?> removerFavorito(@PathVariable Long produtoId) {
        Usuario usuario = getUsuarioLogado();

        boolean removido = usuario.getFavoritos().removeIf(produto -> produto.getId().equals(produtoId));

        if (removido) {
            usuarioRepository.save(usuario);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produto não estava na lista de favoritos");
        }
    }

    private Usuario getUsuarioLogado() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        UsuarioDetails userDetails = (UsuarioDetails) authentication.getPrincipal();
        return userDetails.getUsuario();
    }
}
