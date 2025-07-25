import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    if (token) {
      axios
        .get("/auth/me", {
          withCredentials: true
        })
        .then((res) => setUser(res.data))
        .catch(() => logout());
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await axios.post("/auth/login", { email, password });
    sessionStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  const register = async (formData) => {
    const res = await axios.post("/auth/register", formData);
    sessionStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
  };

  const token = () => sessionStorage.getItem("token");

  return (
    <AuthContext.Provider value={{ user, login, register, logout, token, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
