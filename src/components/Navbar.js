import React from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <i className="fas fa-desktop"></i> PC Shop
        </a>
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
              <a className="nav-link" href="#">
                Início
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Produtos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contato
              </a>
            </li>
          </ul>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-light">
              <i className="fas fa-user me-1"></i> Entrar
            </button>
            <button className="btn btn-outline-light">
              <i className="fas fa-box me-1"></i> Meus Pedidos
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
