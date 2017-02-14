import ws from 'nodejs-websocket';
import Browser from './browser';
import Source from '../../source';
import MainBoard from '../../mainboard';

class WebSocket extends Source {
  constructor(port) {
    super();
    ws.createServer((channel) => {
      MainBoard.add(new Browser(channel, this));
    }).listen(port);
  }
}

export default WebSocket;
