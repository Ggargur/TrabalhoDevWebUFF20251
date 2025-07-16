package com.TavaresGargur.PCShop.controller;

import lombok.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.TavaresGargur.PCShop.dto.LoginRequest;
import com.TavaresGargur.PCShop.dto.RegisterRequest;
import com.TavaresGargur.PCShop.dto.UserDTO;
import com.TavaresGargur.PCShop.model.Usuario;
import com.TavaresGargur.PCShop.service.AuthService;
import com.TavaresGargur.PCShop.utils.JwtUtil;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        var user = authService.register(request);
        return getDefaultReponse(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        var user = authService.login(request);
        return getDefaultReponse(user);
    }

    private ResponseEntity<?> getDefaultReponse(Usuario user){
        String token = jwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok(new TokenResponse(token, new UserDTO(user)));
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(@AuthenticationPrincipal Usuario user) {
        return ResponseEntity.ok(new UserDTO(user));
    }

    record TokenResponse(String token, UserDTO user) {}
}
