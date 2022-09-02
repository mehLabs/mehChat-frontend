import React from "react";

//

// async function getIp(){
//     let laIp;
//     await fetch("https://jsonip.com/", {mode: 'cors'}).then((info) =>info.json()).then((ip) =>{
//         laIp = ip.ip;
//         console.log(laIp);
//     });
//     if (laIp !== "http://181.231.250.83:7000"){
//         return "http://181.231.250.83:7000";
//     }else{
//         return "localhost:7000"
//     }
// }

// const socket = socketio.connect(getIp());

// export default await socket;
export const SocketContext = React.createContext();