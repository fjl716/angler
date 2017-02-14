import Client from './client';
import net from 'net'

export default {
  listen: (port, protocol) => {
    net.createServer((socket) => {
      // 我们获得一个连接 - 该连接自动关联一个socket对象
      // console.log('CONNECTED: ' +
      //   socket.remoteAddress + ':' + socket.remotePort);
      new Client(socket, protocol);
    }).listen(port);
  }
}
