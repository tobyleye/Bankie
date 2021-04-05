import Modal from "./Modal";

export default function CodeModal({ show, onClose }) {
  return (
    <Modal show={show} onClose={onClose}>
      <p>your code is heheh</p>
    </Modal>
  );
}
