import Channel from '../../channel'

class TcpChannel extends Channel {
  constructor(socket, protocol) {
    super(protocol);
    this.socket = socket;
    // 为这个socket实例添加一个"data"事件处理函数
    const self = this;
    socket.on('data', (data) => {
      const packages = protocol.parse(data);
      packages.map(pack => {
        self.arrive(pack);
      })
    });
    // 为这个socket实例添加一个"close"事件处理函数
    socket.on('close', function (data) {
      console.log('CLOSED: ' +
        socket.remoteAddress + ' ' + socket.remotePort);
    });
  }

  out(data) {
    this.socket.write(data);
  }
}
export default TcpChannel;
