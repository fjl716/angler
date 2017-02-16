export default class {
  constructor(socket, protocol) {
    this.socket = socket;
    this.protocol = protocol;
    // 为这个socket实例添加一个"data"事件处理函数
    socket.on('data', (data) => {

      protocol.parse(data);

      console.log(data[5]);
      //socket.write('You said "' + data + '"');
    });
    // 为这个socket实例添加一个"close"事件处理函数
    socket.on('close', function (data) {
      console.log('CLOSED: ' +
        socket.remoteAddress + ' ' + sock.remotePort);
    });
  }

  send(json) {
    this.socket.write(this.protocol.packet(json));
  }
}
