import React, { forwardRef, useImperativeHandle, useState } from "react";
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'

const NicknameModal = forwardRef((props,ref) => {
  useImperativeHandle(ref, () => ({
    firstTimeOpen() {
      setOpen(true);
    }
  }))
  //Lógica de abrir y cerrar
  
  const [open,setOpen] = useState(true);
  const toggleOpen = () => {
    setOpen(!open);
  }

  //


  const [nickname,setNickname] = useState("");

  const handleInputChange = (e) => {
    setNickname(e.target.value)
  }

  const sendNickname = (e) => {
    e.preventDefault();
    props.handleChangeName(nickname);
    toggleOpen();
  }

  

  return (
    <>
    <Modal isOpen={open} toggle={toggleOpen}>
      <ModalHeader toggle={toggleOpen}>Establecer alias</ModalHeader>
      <form onSubmit={sendNickname}>
        <ModalBody>

            <label htmlFor="input-nickname">
              Por favor, ingrese su alias:
            </label>
            <input id="input-nickname" type="text" className='form-control' onChange={handleInputChange} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type='submit'>Cambiar alias</Button>{' '}
          <Button color="danger" onClick={toggleOpen}>Cancelar</Button>
        </ModalFooter>
      </form>
    </Modal>
    </>
  )
})

export default NicknameModal;