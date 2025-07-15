import React from "react";

function ProductCard({ src, nome, descricao, index }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <img src={src} className="card-img-top" alt={nome} />
        <div className="card-body">
          <h5 className="card-title">{nome}</h5>
          <p className="card-text">{descricao}</p>
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target={`#modalProduto${index}`}
          >
            Ver detalhes
          </button>
          <i
            className="fas fa-info-circle ms-2"
            data-bs-toggle="tooltip"
            title="Clique para mais informações"
          ></i>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
