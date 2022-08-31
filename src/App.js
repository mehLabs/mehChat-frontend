import './App.css';
import { Helmet } from "react-helmet";
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import socketIOClient from "socket.io-client";
const server = "http://localhost:7000";

function App() {
  const [response,setResponse] = useState("");

  useEffect( () => {
    const socket = socketIOClient(server);
    socket.on("FromAPI",data => {
      setResponse(data);
    })
  },[])

  return (
    <>
      <Helmet>
        <title>mehChat</title>
        <style>{'body{background-color: #34568B}'}</style>
      </Helmet>
      <h1 className='text-white text-center'>mehChat is online</h1>
      <Container>
        <Row className='bg-white rounded p-2'>
          <Col md={12} className='d-flex flex-column'>
            <ul className='list-group else my-2 d-flex'>
              <li className="list-group-item">Hola crack</li>
              <li className="list-group-item">Todo bien?</li>
            </ul>
            <ul className='list-group my-2 me'>
              <li className="list-group-item d-flex bg-info">
                <span className='me'>
                  Todo bien
                </span>
              </li>
              <li className="list-group-item d-flex bg-info bg-gradient">
                <span className='me'>
                  Son las <time dateTime={response}>{response}</time>
                </span>
              </li>
            </ul>
          </Col>
          <Col md={12}>
            <form className='d-flex w-100 gap-1' action="">
              <input type="text" className='form-control' placeholder='Ingrese su mensaje'></input>
              <Button type='submit' color='primary'>Enviar</Button>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
