package com.TavaresGargur.PCShop.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.TavaresGargur.PCShop.model.Categoria;
import com.TavaresGargur.PCShop.model.Usuario;
import com.TavaresGargur.PCShop.repository.CategoriaRepository;
import com.TavaresGargur.PCShop.repository.UsurarioRepository;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UsurarioRepository usuarioRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

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

        if (categoriaRepository.findAll().isEmpty()) {
            HardSaveCategoria("Processadores");
            HardSaveCategoria("Placa De Vídeo");
            HardSaveCategoria("Memória RAM");
            HardSaveCategoria("HDD");
            HardSaveCategoria("SDD");
            HardSaveCategoria("Monitor");
        }
    }

    private void HardSaveCategoria(String nomeCategoria) {
        Categoria categProcessadores = new Categoria();
        categProcessadores.setNome(nomeCategoria);
        categoriaRepository.save(categProcessadores);
    }
}
