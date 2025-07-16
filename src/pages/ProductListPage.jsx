import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { Card, Button, Spinner, Row, Col, Container } from "react-bootstrap";
import { useCart } from "../contexts/CartContext";

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef();
  const { addToCart } = useCart();

  const loadMore = useCallback(async () => {
    try {
      const res = await axios.get(`/api/produtos?page=${page}&size=10`);
      const newProducts = res.data.content;
      setProducts((prev) => [...prev, ...newProducts]);
      setHasMore(!res.data.last);
    } catch (err) {
      console.error("Erro ao carregar produtos", err);
    }
  }, [page]);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <Container className="my-4">
      <h2>Produtos</h2>
      <Row>
        {products.map((p) => (
          <Col md={4} key={p.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={p.imageUrl || "https://via.placeholder.com/150"} />
              <Card.Body>
                <Card.Title>{p.name}</Card.Title>
                <Card.Text>R$ {p.price.toFixed(2)}</Card.Text>
                <Button onClick={() => addToCart(p)}>Adicionar ao carrinho</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {hasMore && (
        <div ref={loaderRef} className="text-center">
          <Spinner animation="border" />
        </div>
      )}
    </Container>
  );
}