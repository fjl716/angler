import ActiveMQ from './activemq'
import WebSocket from './websocket'

export {
  ActiveMQ,
  WebSocket
}

export default {
  linkSource(source1, source2){
    source1.handleArrive = (msg) => {
      source2.send(msg);
    };

    source2.handleArrive = (msg) => {
      source1.send(msg);
    };
  }
}
