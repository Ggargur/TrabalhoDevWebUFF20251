import React from "react";

function FAQCard({ pergunta, resposta, index }) {
  const collapse = `collapse${index}`;
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`faq${index}`}>
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${collapse}`}
        >
          {pergunta}
        </button>
      </h2>
      <div id={collapse} className="accordion-collapse collapse show">
        <div className="accordion-body">{resposta}</div>
      </div>
    </div>
  );
}

export default FAQCard;
