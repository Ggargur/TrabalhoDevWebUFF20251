import React from "react";
import ProductCard from "./ProductCard";

function ProductList({ produtos }) {
  return (
    <div className="container mt-4">
      <div className="row">
        {produtos.map((item, index) => (
          <ProductCard
            key={index}
            src={item.src}
            index={index + 1}
            descricao={item.descricao}
            nome={item.nome}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
