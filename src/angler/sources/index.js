import activemq from './activemq'
import WebSocket from './websocket'

let source = undefined;

export {
  activemq,
  WebSocket
}

export default {
  setSource(sour, event){
    source = sour;
    source.onDataArrive((msg) => {
      event.emit(msg.event, event.defaultMsg, msg);
    });
    event.source = source;
  },
}
