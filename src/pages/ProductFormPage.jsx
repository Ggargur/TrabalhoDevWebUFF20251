import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Container, Spinner, Table } from "react-bootstrap";
import { useError } from "../contexts/ErrorProvider";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

export default function ProductFormPage() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showError } = useError();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/produtos?page=0&size=50");
      setProducts(res.data.content);
    } catch (err) {
      const mensagem = err.response?.data || "Erro inesperado ao tentar logar.";
      showError(mensagem);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/categorias");
      setCategories(res.data);
    } catch (err) {
      const mensagem = err.response?.data || "Erro inesperado ao tentar logar.";
      showError(mensagem);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleSelect = async (product) => {
    setSelected(product);
    reset(product);
  };

  const handleNew = () => {
    setSelected(null);
    reset({
      nome: "",
      descricao: "",
      preco: 0,
      estoque: 0,
      category: "",
      imageUrl: "",
    });
  };

  const onSubmit = async (data) => {
    try {
      if (selected) {
        await axios.put(`api/produtos/${selected.id}`, data);
      } else {
        await axios.post("api/produtos", data);
      }
      fetchProducts();
      handleNew();
    } catch (err) {
      const mensagem = err.response?.data || "Erro inesperado ao tentar logar.";
      showError(mensagem);
    }
  };

  return (
    <Container className="my-4">
      <h2>Gerenciar Produtos</h2>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Table striped bordered hover className="my-4">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Preço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.nome}</td>
                  <td>R$ {p.preco.toFixed(2)}</td>
                  <td>
                    <Button size="sm" onClick={() => handleSelect(p)}>
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h4>{selected ? "Editar Produto" : "Novo Produto"}</h4>
          <Form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 600 }}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                {...register("nome", { required: "Nome obrigatório" })}
              />
              {errors.nome && (
                <div className="text-danger">{errors.nome.message}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...register("descricao", {
                  required: "Descrição obrigatória",
                })}
              />
              {errors.descricao && (
                <div className="text-danger">{errors.descricao.message}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                {...register("preco", { required: "Preço obrigatório" })}
              />
              {errors.preco && (
                <div className="text-danger">{errors.preco.message}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estoque</Form.Label>
              <Form.Control
                type="number"
                {...register("estoque", { required: "Estoque obrigatório" })}
              />
              {errors.estoque && (
                <div className="text-danger">{errors.estoque.message}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Categoria</Form.Label>
              <Form.Select
                {...register("category", { required: "Categoria obrigatória" })}
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.nome}>
                    {c.nome}
                  </option>
                ))}
              </Form.Select>
              {errors.category && (
                <div className="text-danger">{errors.category.message}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL da imagem</Form.Label>
              <Form.Control {...register("imageUrl")} />
            </Form.Group>
            <Button type="submit">Salvar</Button>
            {selected && (
              <Button variant="secondary" className="ms-2" onClick={handleNew}>
                Novo Produto
              </Button>
            )}
          </Form>
        </>
      )}
    </Container>
  );
}
