import Emitter from 'pattern-emitter2';
const defaultMsg = {
  path : []
};
class Event {
  constructor(container) {
    this.event = new Emitter();
    this.container = container;
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
    model.events.map(item=> {
      if (!item.event){
        item = item.default;
      }
      this.addEvent(item, item.event, this.index++);
    });
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
      container: this.container,
      equipment,
      packet
    });
  }
}

export default Event;
