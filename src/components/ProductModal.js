import React from "react";

function ProductModal({ nome, descricaoDetalhada, index }) {
  let id = `modalProduto${index}`;
  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      aria-labelledby="modalProduto1Label"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={`${id}Label`}>
              {nome}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Fechar"
            ></button>
          </div>
          <div className="modal-body">{descricaoDetalhada}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Fechar
            </button>
            <button type="button" className="btn btn-primary">
              Comprar agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
