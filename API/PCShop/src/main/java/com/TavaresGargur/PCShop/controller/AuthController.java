package com.TavaresGargur.PCShop.controller;

import lombok.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.TavaresGargur.PCShop.dto.LoginRequest;
import com.TavaresGargur.PCShop.dto.RegisterRequest;
import com.TavaresGargur.PCShop.dto.UserDTO;
import com.TavaresGargur.PCShop.model.Usuario;
import com.TavaresGargur.PCShop.model.UsuarioDetails;
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

    private ResponseEntity<?> getDefaultReponse(Usuario user) {
        String token = jwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok(new TokenResponse(token, new UserDTO(user)));
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        UsuarioDetails userDetails = (UsuarioDetails) authentication.getPrincipal();
        Usuario usuario = userDetails.getUsuario();

        return ResponseEntity.ok(new UserDTO(usuario));
    }

    record TokenResponse(String token, UserDTO user) {
    }
}
