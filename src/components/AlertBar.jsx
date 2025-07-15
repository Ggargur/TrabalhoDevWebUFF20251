import React from "react";

function AlertBar({ alerta }) {
  return (
    <div className="alert alert-success text-center m-3" role="alert">
      {alerta}
    </div>
  );
}

export default AlertBar;
