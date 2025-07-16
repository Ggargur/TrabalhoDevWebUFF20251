import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <i className="fas fa-desktop"></i> PC Shop
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/produtos">
                Produtos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">
                Carrinho
              </NavLink>
            </li>
            {user?.isAdmin && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">
                  Cadastro Produtos
                </NavLink>
              </li>
            )}
          </ul>
          <div className="d-flex gap-2">
            {user ? (
              <>
                <button className="btn btn-light" onClick={logout}>
                  <i className="fas fa-right-from-bracket me-1"></i> Sair
                </button>
                <button className="btn btn-outline-light">
                  <i className="fas fa-box me-1"></i> Meus Pedidos
                </button>
              </>
            ) : (
              <>
                <NavLink className="btn btn-outline-light" to="/login">
                  <i className="fas fa-user me-1"></i> Entrar
                </NavLink>
                <NavLink className="btn btn-light" to="/register">
                  <i className="fas fa-user-plus me-1"></i> Registrar
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
