import React, { createContext, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const showError = (message, options = {}) => {
    toast.error(message, {
      position: "bottom-right",
      ...options,
    });
  };

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </ErrorContext.Provider>
  );
};

export const useError = () => useContext(ErrorContext);
