import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthLayout() {
  return (
    <>
      <NavBar />
      <div className="container my-4">
        <div className="bg-secondary bg-opacity-25 p-4 rounded border-secondary mx-auto" style={{ maxWidth: "500px" }}>
          <Outlet />
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
