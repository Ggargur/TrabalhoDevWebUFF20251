import { useEffect, useState, useRef } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card, Button, Row, Col, Container, Spinner } from "react-bootstrap";
import { useCart } from "../contexts/CartContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useError } from "../contexts/ErrorProvider";
import { useFavorites } from "../contexts/FavoritesContext";
import { useAuth } from "../contexts/AuthContext";

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const requestedPages = useRef(new Set());
  const { addToCart, cart, removeFromCart, updateQuantity } = useCart();
  const { showError } = useError();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();

  const token = sessionStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const fetchProducts = async () => {
    if (requestedPages.current.has(page)) return;
    requestedPages.current.add(page);

    try {
      const res = await axios.get(`/api/produtos?page=${page}&size=10`);
      const newProducts = res.data.content;

      setProducts((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const unique = newProducts.filter((p) => !existingIds.has(p.id));
        return [...prev, ...unique];
      });

      setHasMore(!res.data.last);
      setPage((prev) => prev + 1);
    } catch (err) {
      const mensagem = err.response?.data || "Erro inesperado ao tentar logar.";
      showError(mensagem);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container className="my-4">
      <h2>Produtos</h2>
      <InfiniteScroll
        dataLength={products.length}
        next={fetchProducts}
        hasMore={hasMore}
        loader={
          <div className="text-center my-3">
            <Spinner animation="border" />
          </div>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Você chegou ao fim!</b>
          </p>
        }
      >
        <Row>
          {products.map((p) => {
            const isFavorito = isFavorite(p.id);
            return (
              <Col
                xs={12}
                sm={6}
                md={4}
                lg={4}
                className="mb-4 d-flex justify-content-center"
              >
                <Card
                  className="position-relative d-flex flex-column w-100"
                  style={{
                    maxWidth: "400px",
                    height: "100%",
                    minHeight: "380px",
                    flex: "1 1 auto",
                  }}
                >
                  {user && (
                    <Button
                      variant="link"
                      onClick={() => toggleFavorite(p.id)}
                      className="position-absolute"
                      style={{
                        top: "10px",
                        right: "10px",
                        zIndex: 10,
                        color: isFavorito ? "red" : "gray",
                        fontSize: "1.5rem",
                      }}
                      aria-label={
                        isFavorito
                          ? "Remover dos favoritos"
                          : "Adicionar aos favoritos"
                      }
                    >
                      {isFavorito ? <FaHeart /> : <FaRegHeart />}
                    </Button>
                  )}

                  <Card.Img
                    variant="top"
                    src={p.imageUrl || "https://via.placeholder.com/150"}
                    style={{
                      objectFit: "cover",
                      height: "180px",
                      width: "100%",
                    }}
                  />

                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title>{p.nome}</Card.Title>
                      <Card.Text>R$ {p.preco.toFixed(2)}</Card.Text>
                    </div>

                    {(() => {
                      const item = cart.find((c) => c.id === p.id);

                      if (!item) {
                        return (
                          <Button
                            variant="primary"
                            className="w-100 mt-auto"
                            onClick={() => addToCart(p)}
                          >
                            Adicionar ao carrinho
                          </Button>
                        );
                      }

                      return (
                        <div
                          className="d-flex justify-content-between align-items-center w-100 mt-auto"
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
                                removeFromCart(p.id);
                              } else {
                                updateQuantity(p.id, item.quantity - 1);
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

                          <span
                            style={{ fontWeight: "600", fontSize: "1.1rem" }}
                          >
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(p.id, item.quantity + 1)
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
            );
          })}
        </Row>
      </InfiniteScroll>
    </Container>
  );
}
