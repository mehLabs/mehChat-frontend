import React, { useRef } from "react";
import './ChatUI.css';
import { Helmet } from "react-helmet";
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import NicknameModal from './NicknameModal'

import io from 'socket.io-client';




function ChatUI(props) {

  
  const [openModal,setOpenModal] = useState(true);
  const [socket,setSocket] = useState(null);
  // eslint-disable-next-line
  const [name,setName] = useState("");
  const [users,setUsers] = useState([]);
  const [msgs,setMsgs] = useState([]);
  const [myId,setMyId] = useState();
  const [msgToSend,setMsgToSend] = useState("");

  const nicknameModalRef = useRef();
  const handleChangeName = (nickname) => {
    setName(nickname);
    socket.emit("changeName",nickname)
  }

  useEffect( () => {
    if (socket === null){

      setSocket(io("https://meh-chat-server.vercel.app/"))
    }
    if (socket !== null){
      
      socket.on('connect', (socket) => {console.log("socket connected " + socket)});
      socket.on('lastMsgs', (mensajes) => {setMsgs(msgs.concat(mensajes))});
      socket.on("id", id => {
        setMyId(id);
      })
      socket.on("chat", (msg) => {
        setMsgs(msgs.concat([msg]));

        if (msg.id === myId){
          
          setTimeout(() => {
            let chatBox = document.getElementById("chatBox");
  
            chatBox.scrollTo(0,chatBox.scrollHeight)
          }, 10);
        }
      })
      socket.on("userEvent", (newUsers) => {
        setUsers(newUsers);
      })
    }



  },[myId,socket,msgs])

  const handleInputChange = (e) => {
    setMsgToSend(e.target.value);
  }

  const handleOpenModal = (isOpen) => {
    setOpenModal(isOpen)
  }

  const toggleChangeName = () => {
    setOpenModal(true);
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
      <NicknameModal open={openModal} setOpen={handleOpenModal} ref={nicknameModalRef} handleChangeName={handleChangeName} />
      <Container className="body">
        <div className="title">
          <h1 className='text-white text-center'>mehChat is online</h1>
        </div>
        <Row className='bg-white rounded p-2'>
          <Col xs={8}>
            <div  id="chatBox" className='d-flex flex-column chat-content'>
            {
              msgs.map((msg,index) => (
                <div className={'d-flex flex-column ' + (myId === msg.id ? 'me' : 'else') } key={msg.date}>
                  {
                    (() => {if (index === 0 || msgs[index-1].id!==msg.id){
                      return <small>{msg.name}</small>
                      }
                    })()
                  }
                  <ul  className="list-group d-flex">
                    <li className={"list-group-item " + (msg.id === null ? 'bg-info' : '')}> {msg.msg}</li>
                  </ul>
                </div>
              ))
            }
            </div>
            <div className="mt-2">
              <form className='d-flex w-100 gap-1 chat-input' onSubmit={enviarMensaje}>
                <input onChange={handleInputChange} value={msgToSend} type="text" className='form-control' placeholder='Ingrese su mensaje'></input>
                <Button type='submit' color='primary'>Enviar</Button>
              </form>
            </div>
          </Col>
          <Col xs={4}>
            <div  className="users d-flex flex-column border border-info bg-info bg-opacity-10 rounded">
              <h3 className="text-center">Conectados</h3>
              <ul className="list-group">
                {
                  // eslint-disable-next-line
                    users.map((user) => {
                      if (user.id === myId){
                        return(
                          <li key={user.id} className="list-group-item d-flex align-items-center">
                            {user.name} 
                            <button type="button" className="btn" onClick={toggleChangeName}><i className="bi bi-pencil-square"></i></button>
                          </li>
                        )
                      }else{
                        if(user.name !== undefined && user.name !== null && user.name.length > 0){
                          return(
                            <li key={user.id} className="list-group-item">{user.name}</li>
                          )
                        }
                      }
                    }
                    )
                }
              </ul>

            </div>
            <div className="col-12 mt-auto">Usuarios conectados: {users.length}</div>
          </Col>
        </Row>
      </Container>
      <div className="col-12 bg-dark text-white p-4">Hecho por meh. v0.1</div>
    </>
  )

}

export default ChatUI;
