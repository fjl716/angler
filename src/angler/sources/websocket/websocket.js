import Source from '../../source'
import MainBoard from '../../mainboard'
import WebSocketChannel from './websocketchannel'

class WebSocket extends Source {
  constructor() {
    super();
  }

  start() {
    require('express-ws')(this.angler.express);
    const protocol = this.protocol;
    this.angler.express.ws('/ws', function (line, req) {
      const channel = new WebSocketChannel(line);
      const equipment = protocol.equipment(this, channel);
      channel.link({equipment});
      MainBoard.add(equipment);
    }.bind(this));
  }
}

export default WebSocket;
