import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import HomePage from "../pages/HomePage";
import ProductListPage from "../pages/ProductListPage";
import ProductFormPage from "../pages/ProductFormPage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import FavoritesPage from "../pages/FavoritesPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      // { path: "admin", element: <AdminPage /> },
      { path: "produtos", element: <ProductListPage /> },
      { path: "admin/produtos/novo", element: <ProductFormPage /> },
      { path: "admin/produtos/:id", element: <ProductFormPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "favoritos", element: <FavoritesPage /> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
]);

export default router;
