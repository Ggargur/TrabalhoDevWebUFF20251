import React, { useEffect } from "react";
import Tooltip from "bootstrap/js/dist/tooltip";
import Popover from "bootstrap/js/dist/popover";

import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import AlertBar from "./components/AlertBar";
import ProductList from "./components/ProductList";
import FAQ from "./components/FAQ";
import HelpPopover from "./components/HelpPopover";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    tooltipTriggerList.forEach((el) => {
      new Tooltip(el);
    });

    const popoverTriggerList = document.querySelectorAll(
      '[data-bs-toggle="popover"]'
    );
    popoverTriggerList.forEach((el) => {
      new Popover(el);
    });
  }, []);

  return (
    <>
      <Navbar />
      <Carousel
        imagens={[
          {
            src: "/promocoes/note.jpg",
            alt: "Notebook promoção",
          },
          {
            src: "/promocoes/Pc.jpg",
            alt: "PC promoção",
          },
        ]}
      />
      <AlertBar alerta="Frete grátis para compras acima de R$500!" />
      <ProductList
        produtos={[
          {
            src: "produtos/placa.jpg",
            nome: "Placa de Vídeo RTX 4070",
            descricao: "Alta performance para games e produtividade.",
            descricaoDetalhada: "Descrição detalhada do produto, especificações técnicas e avaliações de usuários.",
          },
          {
            src: "produtos/processador.png",
            nome: "Processador Ryzen 7 5800X",
            descricao: "Desempenho incrível para multitarefas e jogos pesados.",
            descricaoDetalhada: "Descrição detalhada do produto, especificações técnicas e avaliações de usuários.",
          },
          {
            src: "produtos/RAM.jpg",
            nome: "Memória RAM 16GB DDR4",
            descricao: "Alta velocidade para desempenho otimizado.",
            descricaoDetalhada: "Descrição detalhada do produto, especificações técnicas e avaliações de usuários.",
          },
        ]}
      />
      <FAQ
        perguntas={[
          {
            pergunta: "Quais são as formas de pagamento?",
            resposta: "Aceitamos cartão de crédito, boleto e Pix.",
          },
          {
            pergunta: "Qual o prazo de entrega?",
            resposta: "De 3 a 10 dias úteis dependendo da região.",
          },
        ]}
      />
      <HelpPopover
        titulo="Precisa de ajuda?"
        popover="Entre em contato pelo WhatsApp ou email."
      />
      <Testimonials
        testimonials={[
          {
            text: "Entrega rápida e produto impecável. Recomendo muito a PC Shop!",
            name: "João M., São Paulo",
          },
          {
            text: "Comprei todas as peças para meu setup gamer aqui. Atendimento excelente!",
            name: "Carla R., Belo Horizonte",
          },
          {
            text: "Os preços são os melhores do mercado, e ainda ganhei frete grátis!",
            name: "Vinícius L., Curitiba",
          },
        ]}
      />
      <Footer />
    </>
  );
}

export default App;
