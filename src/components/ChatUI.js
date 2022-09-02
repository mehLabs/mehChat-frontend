import React, { useRef } from "react";
import './ChatUI.css';
import { Helmet } from "react-helmet";
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import NicknameModal from './NicknameModal'

import io from 'socket.io-client';




function ChatUI(props) {

  
  
  const [socket,setSocket] = useState(null);
  // eslint-disable-next-line
  const [name,setName] = useState("");
  const [msgs,setMsgs] = useState([]);
  const [myId,setMyId] = useState();
  const [msgToSend,setMsgToSend] = useState("");

  const nicknameModalRef = useRef();
  const handleChangeName = (nickname) => {
    setName(nickname);
    console.log("Mi nuevo nombre es: "+name)
  }

  useEffect( () => {
    if (socket === null){

      setSocket(io(window.location.origin.replace(":3000","") + ":7000"))
    }
    if (socket !== null){
      
      socket.on('connect', (socket) => {console.log("socket connected " + socket)})
      socket.on("id", id => {
        setMyId(id);
      })
      socket.on("chat", (msg) => {
        setMsgs(msgs.concat([msg]))
      })
    }



  },[socket,msgs])

  const handleInputChange = (e) => {
    setMsgToSend(e.target.value);
  }


  const enviarMensaje = (e) => {
    e.preventDefault();
    socket.emit('chat',{
      msg: msgToSend,
      date: new Date(),
      name: name,
      id: myId
    });
    setMsgToSend("");
  }

  return(
    <>
      <Helmet>
        <title>mehChat</title>
        <style>{'body{background-color: #34568B}'}</style>
      </Helmet>
      <NicknameModal ref={nicknameModalRef} handleChangeName={handleChangeName} />
      <Container className="body">
        <div className="title">
          <h1 className='text-white text-center'>mehChat is online</h1>
        </div>
        <Row className='bg-white rounded p-2'>
          <Col md={12} className='d-flex flex-column chat-content'>
          {
            msgs.map((msg,index) => (
              <div className={myId === msg.id ? 'me d-flex flex-column' : 'else d-flex flex-column'} key={msg.date}>
                {
                  (() => {if (index === 0 || msgs[index-1].id!==msg.id){
                    return <small>{msg.name}</small>
                    }
                  })()
                }
                <ul  className="list-group d-flex">
                  <li className="list-group-item"> {msg.msg}</li>
                </ul>
              </div>
            ))
          }
          </Col>
          <Col md={12}>
            <form className='d-flex w-100 gap-1 chat-input' onSubmit={enviarMensaje}>
              <input onChange={handleInputChange} value={msgToSend} type="text" className='form-control' placeholder='Ingrese su mensaje'></input>
              <Button type='submit' color='primary'>Enviar</Button>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  )

}

export default ChatUI;
