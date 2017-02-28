

export default {
  parse(data) {
    return [new JsonPacket(JSON.parse(data))];
  },

  serialize({packet}) {
    return JSON.stringify({
      event: packet.event,
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
