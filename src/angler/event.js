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
        this.event.on(item.event, (...params) => {
          const oldMsg = params[1];
          const newMsg = params[2];
          newMsg.path = oldMsg.path.slice();
          if (newMsg.path.indexOf(code) == -1) {
            newMsg.path.push(code);
            params.splice(1, 1);
            item.invoke(...params);
          }
        });
      } else {
        for (let name in item) {
          let eventName = item[name].event ? item[name].event : `${namespace}.${name}`;
          let code = this.index++;
          this.event.on(eventName, (...params) => {
            const oldMsg = params[1];
            const newMsg = params[2];
            newMsg.path = oldMsg.path.slice();
            if (newMsg.path.indexOf(code) == -1) {
              newMsg.path.push(code);
              params.splice(1, 1);
              item[name].invoke(...params);
            }
          });
        }
      }
    }
  };

  async arrive(packet) {
    // const tmp = {
    //   result: true,
    //   code:1
    // };
    // await filter.parse(msg.event, [tmp,msg]);
    // if (tmp.result) {
    //   event.emit(msg.event, msg);
    // }
    this.event.emit(packet.getKey(), this.angler,defaultMsg, packet);
  }
}

export default Event;
