import * as React from "react";

const cover = {
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
};
const Modal = ({ show, children, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        ...cover,
        display: "flex",
        alignItems: "flex-end",
        transition: "250ms",
        visibility: show === true ? "visible" : "hidden",
      }}
    >
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          border: "1px solid black",
          ...cover,
          background: "rgba(0,0,0,.68)",
          transition: "250ms",
          opacity: show ? 1 : 0,
        }}
      ></div>
      <div
        style={{
          padding: 10,
          position: "relative",
          background: "#fff",
          width: "100%",
          borderTopRightRadius: 8,
          borderTopLeftRadius: 8,
          transition: "250ms",
          transform: show ? "translateY(0)" : "translateY(100%)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
