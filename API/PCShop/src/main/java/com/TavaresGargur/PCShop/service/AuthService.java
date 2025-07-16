package com.TavaresGargur.PCShop.service;

import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.TavaresGargur.PCShop.dto.LoginRequest;
import com.TavaresGargur.PCShop.dto.RegisterRequest;
import com.TavaresGargur.PCShop.exception.SenhaInvalidaException;
import com.TavaresGargur.PCShop.exception.UsuarioDuplicadoException;
import com.TavaresGargur.PCShop.exception.UsuarioNaoEncontradoException;
import com.TavaresGargur.PCShop.model.Usuario;
import com.TavaresGargur.PCShop.repository.UsurarioRepository;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsurarioRepository userRepository;

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public Usuario register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new UsuarioDuplicadoException("Email já está em uso");
        }

        if (userRepository.existsByName(request.getName())) {
            throw new UsuarioDuplicadoException("Nome de usuário já está em uso");
        }

        Usuario user = Usuario.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder().encode(request.getPassword()))
                .build();

        userRepository.save(user);
        return user;
    }

    public Usuario login(LoginRequest request) {
        Usuario user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsuarioNaoEncontradoException("Usuário não encontrado"));

        if (!passwordEncoder().matches(request.getPassword(), user.getPassword())) {
            throw new SenhaInvalidaException("Senha inválida");
        }

        return user;
    }

    public Usuario getUsuarioLogado() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Usuário não autenticado");
        }

        String email = authentication.getName(); // normalemente é o username (e-mail)

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

}
