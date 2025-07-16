package com.TavaresGargur.PCShop.dto;

import java.util.List;

import com.TavaresGargur.PCShop.model.Produto;
import com.TavaresGargur.PCShop.model.Usuario;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private boolean isAdmin;
    private List<Produto> favoritos;

    public UserDTO(Usuario user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.isAdmin = user.isAdmin();
        this.favoritos = user.getFavoritos();
    }
}
