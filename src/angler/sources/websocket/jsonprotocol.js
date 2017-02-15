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

  packet(equipment, data) {
    return JSON.stringify({
      event: data.event,
      data: data.data
    });
  },

  equipment(channel, source){
    return new Browser(channel, source)
  }
};
