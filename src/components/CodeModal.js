import * as React from "react";
import Modal from "./Modal";

const CodeModal = ({ show, code, onClose }) => {
  return (
    <Modal show={show} onClose={onClose}>
      <p>your code is {code}</p>
    </Modal>
  );
};

export default CodeModal;
