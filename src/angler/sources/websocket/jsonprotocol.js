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
  parse(data) {},

  serialize() {},

  packet(equipment, data){
    return new JsonPacket(data);
  },

  equipment(channel, source){
    return new Browser(channel, source)
  }
};
