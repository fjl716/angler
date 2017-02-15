import net from 'net'
import Source from '../../source';
import MainBoard from '../../mainboard';
import TcpChannel from './tcpchannel';

class Tcp extends Source {
  constructor(port) {
    super();
    this.port = port;
  }

  start(){
    const protocol = this.protocol;
    net.createServer((socket) => {
      const channel = new TcpChannel(socket);
      const equipment = protocol.equipment(this, channel);
      channel.bind(equipment);
      MainBoard.add(equipment);
    }).listen(port);
  }
}

export default Tcp
