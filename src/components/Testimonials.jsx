import React from "react";

function Testimonials({ testimonials }) {
  return (
    <section className="bg-light py-5 mt-5">
      <div className="container text-center">
        <h2 className="mb-4">
          <i className="fas fa-comments me-2"></i>O que nossos clientes dizem
        </h2>
        <div className="row">
          {testimonials.map((t, i) => (
            <div className="col-md-4 mb-4" key={i}>
              <div className="p-4 border rounded shadow-sm h-100 bg-white">
                <p className="fst-italic">"{t.text}"</p>
                <h6 className="mt-3">— {t.name}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
