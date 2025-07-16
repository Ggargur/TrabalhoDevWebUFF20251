import { useCart } from "../contexts/CartContext";
import { Container, Table, Button, Form } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  const [localQuantities, setLocalQuantities] = useState(() =>
    Object.fromEntries(cart.map((item) => [item.id, item.quantity.toString()]))
  );

  const invalidInputsRef = useRef(new Set());

  useEffect(() => {
    setLocalQuantities(
      Object.fromEntries(
        cart.map((item) => [item.id, item.quantity.toString()])
      )
    );
  }, [cart]);

  const handleChange = (e, id) => {
    const value = e.target.value;
    setLocalQuantities((prev) => ({ ...prev, [id]: value }));

    if (/^[1-9]\d*$/.test(value)) {
      updateQuantity(id, parseInt(value));
      invalidInputsRef.current.delete(id);
    } else {
      invalidInputsRef.current.add(id);
    }
  };

  // Calcula total normalmente, independente de inputs inválidos
  const total = cart.reduce((sum, item) => sum + item.preco * item.quantity, 0);

  useEffect(() => {
    if (invalidInputsRef.current.size > 0) {
      setTimeout(() => {
        const firstInvalidId = invalidInputsRef.current.values().next().value;
        const input = document.querySelector(
          `input[data-id='${firstInvalidId}']`
        );
        if (input) input.focus();
      }, 0);
    }
  }, [localQuantities]);

  return (
    <Container className="my-4">
      <h2>Carrinho</h2>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.nome}</td>
                  <td>R$ {item.preco.toFixed(2)}</td>
                  <td>
                    <Form.Control
                      type="text"
                      data-id={item.id}
                      value={localQuantities[item.id] || ""}
                      onChange={(e) => handleChange(e, item.id)}
                      style={{
                        width: "80px",
                        borderColor: invalidInputsRef.current.has(item.id)
                          ? "red"
                          : undefined,
                      }}
                    />
                  </td>
                  <td>R$ {(item.preco * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => {
                        removeFromCart(item.id);
                        setLocalQuantities((prev) => {
                          const copy = { ...prev };
                          delete copy[item.id];
                          return copy;
                        });
                        invalidInputsRef.current.delete(item.id);
                      }}
                    >
                      Remover
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h4>Total: R$ {total.toFixed(2)}</h4>
          <Button variant="secondary" onClick={clearCart}>
            Limpar carrinho
          </Button>
        </>
      )}
    </Container>
  );
}
