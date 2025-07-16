package com.TavaresGargur.PCShop.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.TavaresGargur.PCShop.model.Usuario;
import com.TavaresGargur.PCShop.repository.UserRepository;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UserRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        Usuario user = usuarioRepository.findByEmail("admin@email.com").orElse(new Usuario());
        user.setEmail("admin@email.com");
        user.setPassword(passwordEncoder.encode("senha123"));
        user.setName("Administrador");
        user.setAdmin(true);
        usuarioRepository.save(user);
        System.out.println("Usuário admin criado.");
    }
}
