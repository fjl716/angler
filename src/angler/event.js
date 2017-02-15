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

  addModel = (model) => {
    for (let namespace in model) {
      let item = model[namespace];
      if (item.event) {
        let code = this.index++;
        this.event.on(item.event, (obj,...params) => {
          const previous = obj.previous ? obj.previous : defaultMsg;
          const packet = obj.packet;

          packet.path = previous.path.slice();

          if (packet.path.indexOf(code) == -1) {
            packet.path.push(code);
            item.invoke(obj,...params);
          }
        });
      } else {
        for (let name in item) {
          let eventName = item[name].event ? item[name].event : `${namespace}.${name}`;
          let code = this.index++;
          this.event.on(eventName, (obj,...params) => {
            const previous = obj.previous ? obj.previous : defaultMsg;
            const packet = obj.packet;
            packet.path = previous.path.slice();
            if (packet.path.indexOf(code) == -1) {
              packet.path.push(code);
              item.invoke(obj,...params);
            }
          });
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
