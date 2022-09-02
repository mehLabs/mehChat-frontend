import './App.css';
import ChatUI from './components/ChatUI'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

function App() {

  const [ip] = useState("http://181.231.250.83:7000");

  useEffect( () => {
  })

  return (
    
    <ChatUI ip={ip}></ChatUI>
  );
}

export default App;
