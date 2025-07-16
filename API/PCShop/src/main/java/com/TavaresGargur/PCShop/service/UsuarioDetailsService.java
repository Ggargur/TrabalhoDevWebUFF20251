package com.TavaresGargur.PCShop.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.TavaresGargur.PCShop.model.Usuario;
import com.TavaresGargur.PCShop.model.UsuarioDetails;
import com.TavaresGargur.PCShop.repository.UsurarioRepository;

import lombok.*;

@Service
@AllArgsConstructor
public class UsuarioDetailsService implements UserDetailsService {

    private final UsurarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + email));

        return new UsuarioDetails(usuario);
    }
}