import React from "react";
import Modal from "@mui/material/Modal";
import AuthForm from "../AuthForm/AuthForm";
import "./MyModal.css";
export default function MyModal(props) {
  const handleClose = () => props.setIsOpen(false);
  return (
    <Modal
      className="AuthModalCon"
      open={props.isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        <AuthForm
          isLogin={props.isLogin}
          isLoginModalOpen={props.isOpen}
          setIsLoginModalOpen={props.setIsOpen}
        />
    </>
    </Modal>
  );
}
