import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-light text-center text-lg-start mt-5">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4">
            <h5 className="text-uppercase">
              <i className="fas fa-microchip me-2"></i>PC Shop
            </h5>
            <p>
              Loja especializada em peças de alta performance para montagem e
              upgrade de computadores.
            </p>
          </div>
          <div className="col-lg-6 col-md-12 mb-4 text-center">
            <h5 className="text-uppercase" id="contatos">Siga-nos</h5>
            {["facebook-f", "instagram", "twitter", "whatsapp"].map((icon) => (
              <a
                key={icon}
                className="btn btn-outline-light btn-floating m-1"
                role="button"
              >
                <i className={`fab fa-${icon}`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center p-3 bg-secondary">
        © 2025 PC Shop - Todos os direitos reservados
      </div>
    </footer>
  );
}

export default Footer;
