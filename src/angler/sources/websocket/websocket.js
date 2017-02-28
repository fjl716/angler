import Source from '../../source'
import MainBoard from '../../mainboard'
import WebSocketChannel from './websocketchannel'

class WebSocket extends Source {
  constructor(express) {
    super();
    this.express = express;
  }

  start() {
    require('express-ws')(this.express);
    const protocol = this.protocol;
    this.express.ws('/ws', function (line, req) {
      const channel = new WebSocketChannel(line);
      const equipment = protocol.equipment(this, channel);
      channel.link({equipment});
      MainBoard.add(equipment);
    }.bind(this));
  }
}

export default WebSocket;
