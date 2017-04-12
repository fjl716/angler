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

  add(event) {
    const code = this.index++;
    this.event.on(event.event, (obj, ...params) => {
      const previous = obj.previous ? obj.previous : defaultMsg;
      const packet = obj.packet;

      packet.path = previous.path.slice();

      if (packet.path.indexOf(code) == -1) {
        packet.path.push(code);
        event.invoke(obj, ...params);
      }
    });
  }
  // addEvent(item, eventName, code) {
  //   this.event.on(eventName, (obj, ...params) => {
  //     const previous = obj.previous ? obj.previous : defaultMsg;
  //     const packet = obj.packet;
  //
  //     packet.path = previous.path.slice();
  //
  //     if (packet.path.indexOf(code) == -1) {
  //       packet.path.push(code);
  //       item.invoke(obj, ...params);
  //     }
  //   });
  // }
  //
  // addEvents = (events) => {
  //   events.map(event => {
  //     this.addEvent(event, event.event, this.index++);
  //   });
  // };

  async arrive({equipment, packet}) {
    this.event.emit(packet.getKey(), {
      container: this.container,
      equipment,
      packet
    });
  }
}

export default Event;
