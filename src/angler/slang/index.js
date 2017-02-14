
import Protocol from './protocol';
import net from 'net'
import Client from './type/client';

import Task from '../slang/task';
import Drive from '../slang/drive';
import Channel from '../slang/channel';

export {
  Task,
  Drive,
  Channel
}

class Slang {
  constructor({port,host,protocol}){
    this.protocol = new Protocol(protocol);

    net.createServer((socket)=> {
      // 我们获得一个连接 - 该连接自动关联一个socket对象
      // console.log('CONNECTED: ' +
      //   socket.remoteAddress + ':' + socket.remotePort);
      new Client(socket,this.protocol);
    }).listen(port, host);
  }
  onDataArrive(arrive) {
    this.handleArrive = arrive;
  }
  send(msg) {
    console.log(msg);
    // const client = this.clientMap[msg.link];
    // if (client) {
    //   const sendObj = {
    //     event: msg.event,
    //     data: msg.data
    //   };
    //   client.sendText(JSON.stringify(sendObj));
    // }
  }
}
export default Slang;
