import ws from 'nodejs-websocket';
import Source from '../../source';
import MainBoard from '../../mainboard';

class WebSocket extends Source {
  constructor(port) {
    super();
    this.port = port;
  }

  start(){
    const protocol = this.protocol;
    ws.createServer((channel) => {
      MainBoard.add(protocol.equipment(channel,this));
    }).listen(this.port);
  }
}

export default WebSocket;
