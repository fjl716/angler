import net from 'net'
import Source from '../../source';
import MainBoard from '../../mainboard';

class Tcp extends Source {
  constructor(port) {
    super();
    this.port = port;
  }

  start(){
    const protocol = this.protocol;
    net.createServer((socket) => {
      MainBoard.add(protocol.equipment(socket,this));
    }).listen(port);
  }
}

export default Tcp
