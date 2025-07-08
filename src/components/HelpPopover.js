import React from "react";

function HelpPopover({ titulo, popover }) {
  return (
    <div className="container text-center mt-4">
      <button
        type="button"
        className="btn btn-info"
        data-bs-toggle="popover"
        title="Ajuda"
        data-bs-content={popover}
      >
        {titulo}
      </button>
    </div>
  );
}

export default HelpPopover;
