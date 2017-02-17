import ws from 'nodejs-websocket'
import Source from '../../source'
import MainBoard from '../../mainboard'
import WebSocketChannel from './websocketchannel'

class WebSocket extends Source {
  constructor(port) {
    super();
    this.port = port;
  }

  start() {
    const protocol = this.protocol;
    ws.createServer((line) => {
      const channel = new WebSocketChannel(line);
      const equipment = protocol.equipment(this, channel);
      channel.link({equipment});
      MainBoard.add(equipment);
    }).listen(this.port);
  }
}

export default WebSocket;
