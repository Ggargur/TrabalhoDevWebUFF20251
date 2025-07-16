package com.TavaresGargur.PCShop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.TavaresGargur.PCShop.model.Usuario;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByName(String name);
}
