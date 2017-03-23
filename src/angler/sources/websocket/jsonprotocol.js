import Packet from '../../packet'
import Browser from './browser';
class JsonPacket extends Packet{
  constructor(data){
    super(data)
  }

  getKey() {
    return this.event;
  }
}

export default {
  parse(data) {
    return [new JsonPacket(JSON.parse(data))];
  },

  serialize({packet}) {
    return JSON.stringify({
      event: packet.event,
      __CALL_ID__: packet.__CALL_ID__,
      data: packet.data
    });
  },

  packet(equipment, data){
    return new JsonPacket(data);
  },

  equipment(channel, source){
    return new Browser(channel, source)
  }
};
