import './App.css';
import ChatUI from './components/ChatUI'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect} from 'react';
import io from 'socket.io-client';

function App() {

  const socket = io();

  useEffect( () => {
  })

  return (
    
    <ChatUI socket={socket}></ChatUI>
  );
}

export default App;
