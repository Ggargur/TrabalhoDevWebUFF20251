import React from "react";

function Carousel({ imagens }) {
  return (
    <div
      id="carouselExample"
      className="carousel slide mt-3"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {imagens.map((img, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img src={img.src} className="d-block w-100 h-50" alt={img.alt} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
