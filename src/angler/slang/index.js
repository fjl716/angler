import Task from './task'
import Drive from './drive'
import Channel from '../sources/channel'
import Protocol from './protocol'

export {
  Task,
  Drive,
  Channel,
  Protocol
}

// class Slang {
//   constructor(protocol){
//     this.protocol = new Protocol(protocol);
//
//
//   }
//   onDataArrive(arrive) {
//     this.handleArrive = arrive;
//   }
//   send(msg) {
//     console.log(msg);
//     // const client = this.clientMap[msg.link];
//     // if (client) {
//     //   const sendObj = {
//     //     event: msg.event,
//     //     data: msg.data
//     //   };
//     //   client.sendText(JSON.stringify(sendObj));
//     // }
//   }
// }
// export default Slang;
