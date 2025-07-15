import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Outlet />
    </div>
  );
}
