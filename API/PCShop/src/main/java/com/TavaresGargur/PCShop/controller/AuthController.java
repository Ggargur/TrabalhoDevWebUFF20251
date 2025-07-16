package com.TavaresGargur.PCShop.controller;

import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.TavaresGargur.PCShop.dto.LoginRequest;
import com.TavaresGargur.PCShop.dto.RegisterRequest;
import com.TavaresGargur.PCShop.service.AuthService;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.ok("Usuário registrado com sucesso");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        authService.login(request);
        return ResponseEntity.ok("Login realizado com sucesso");
    }
}
