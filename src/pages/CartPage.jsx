import { useCart } from "../contexts/CartContext";
import { Container, Table, Button } from "react-bootstrap";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
                  <td>{item.name}</td>
                  <td>R$ {item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>R$ {(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => removeFromCart(item.id)}
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
