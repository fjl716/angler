import Emitter from 'pattern-emitter2';
const defaultMsg = {
  path : []
};
class Event {
  constructor(angler) {
    this.event = new Emitter();
    this.angler = angler;
    this.index = 1;
  }

  addEvent(item, eventName, code) {
    // console.log(eventName);
    this.event.on(eventName, (obj, ...params) => {
      const previous = obj.previous ? obj.previous : defaultMsg;
      const packet = obj.packet;

      packet.path = previous.path.slice();

      if (packet.path.indexOf(code) == -1) {
        packet.path.push(code);
        item.invoke(obj, ...params);
      }
    });
  }

  addModel = (model) => {
    for (let namespace in model) {
      let item = model[namespace];
      if (item.event) {
        let eventName = item.event;
        let code = this.index++;
        this.addEvent(item, eventName, code);
      } else {
        for (let name in item) {
          let eventName = item[name].event ? item[name].event : `${namespace}.${name}`;
          let code = this.index++;
          this.addEvent(item, eventName, code);
        }
      }
    }
  };

  async arrive({equipment, packet}) {
    // const tmp = {
    //   result: true,
    //   code:1
    // };
    // await filter.parse(msg.event, [tmp,msg]);
    // if (tmp.result) {
    //   event.emit(msg.event, msg);
    // }
    this.event.emit(packet.getKey(), {
      angler: this.angler,
      equipment,
      packet
    });
  }
}

export default Event;
