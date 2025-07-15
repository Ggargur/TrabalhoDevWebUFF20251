import React from "react";
import FAQCard from "./FAQCard";

function FAQ({ perguntas }) {
  return (
    <div className="container mt-5">
      <h4>FAQ</h4>
      <div className="accordion" id="accordionFAQ">
        {perguntas.map((item, index) => (
          <FAQCard
            key={index}
            index={index + 1}
            pergunta={item.pergunta}
            resposta={item.resposta}
          />
        ))}
      </div>
    </div>
  );
}

export default FAQ;
