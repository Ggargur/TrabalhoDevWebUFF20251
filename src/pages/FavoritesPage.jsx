import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useFavorites } from "../contexts/FavoritesContext";

export default function FavoritesPage() {
  const { addToCart, cart, removeFromCart, updateQuantity } = useCart();
  const { user } = useAuth();
  const { favoritos, setFavoritos } = useFavorites();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token || !user) return;
  }, []);

  return (
    <Container className="my-4">
      <h2>Favoritos</h2>
      {favoritos.length === 0 ? (
        <p>Você ainda não tem produtos favoritos.</p>
      ) : (
        <Row>
          {favoritos.map((product) => (
            <Col md={4} key={product.id} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={product.imageUrl || "https://via.placeholder.com/150"}
                />
                <Card.Body>
                  <Card.Title>{product.nome}</Card.Title>
                  <Card.Text>R$ {product.preco.toFixed(2)}</Card.Text>
                  {(() => {
                    const item = cart.find((c) => c.id === product.id);

                    if (!item) {
                      // Se não está no carrinho, botão simples "Adicionar ao carrinho"
                      return (
                        <Button
                          variant="primary"
                          className="w-100"
                          onClick={() => addToCart(product)}
                        >
                          Adicionar ao carrinho
                        </Button>
                      );
                    }

                    // Se já está no carrinho, mostra o controle de quantidade
                    return (
                      <div
                        className="d-flex justify-content-between align-items-center w-100"
                        style={{
                          backgroundColor: "#0d6efd",
                          borderRadius: "0.375rem",
                          color: "white",
                          userSelect: "none",
                          padding: "0.375rem 0.75rem",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            if (item.quantity === 1) {
                              removeFromCart(product.id);
                            } else {
                              updateQuantity(product.id, item.quantity - 1);
                            }
                          }}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "white",
                            fontSize: "1.25rem",
                            cursor: "pointer",
                            padding: 0,
                            lineHeight: 1,
                            width: 30,
                            height: 30,
                          }}
                          aria-label="Diminuir quantidade"
                        >
                          –
                        </button>

                        <span style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product.id, item.quantity + 1)
                          }
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "white",
                            fontSize: "1.25rem",
                            cursor: "pointer",
                            padding: 0,
                            lineHeight: 1,
                            width: 30,
                            height: 30,
                          }}
                          aria-label="Aumentar quantidade"
                        >
                          +
                        </button>
                      </div>
                    );
                  })()}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
