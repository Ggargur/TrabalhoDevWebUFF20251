package com.TavaresGargur.PCShop.exception;

public class UsuarioDuplicadoException extends RuntimeException {
    public UsuarioDuplicadoException(String mensagem) {
        super(mensagem);
    }
}