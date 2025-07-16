import React from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

function ProductList({ produtos }) {
  return (
    <div className="container mt-4">
      <div className="row">
        {produtos.map((item, index) => (
          <>
            <ProductCard
              key={`card${index}`}
              src={item.src}
              index={index + 1}
              descricao={item.descricao}
              nome={item.nome}
            />
            <ProductModal
              key={`modal${index}`}
              nome={item.nome}
              descricaoDetalhada={item.descricaoDetalhada}
              index={index + 1}
            />
          </>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
