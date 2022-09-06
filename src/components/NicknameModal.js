import React, { forwardRef, useImperativeHandle, useState } from "react";
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'

const NicknameModal = forwardRef((props,ref) => {
  useImperativeHandle(ref, () => ({
  }))
  //Lógica de abrir y cerrar
  
  const toggleOpen = () => {
    console.log(nickname.length)
    if(!nickname.length > 0){
      alert("Ingresá un nombre para empezar a chatear!")
    }else{
      props.setOpen(!props.open);
    }
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
    <Modal isOpen={props.open} toggle={toggleOpen}>
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