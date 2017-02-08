import Emitter from 'pattern-emitter2';
const event = new Emitter();

let client = null;
import filter from './filter';
event.index = 1;

event.arrive = async (msg)=> {
  // const tmp = {
  //   result: true,
  //   code:1
  // };
  // await filter.parse(msg.event, [tmp,msg]);
  // if (tmp.result) {
  //   event.emit(msg.event, msg);
  // }
  event.emit(msg.event, msg);
};

event.addArray = (array) => {
  array.map(item => {
    event.on(item.event, item.invoke);
  })
};

event.defaultMsg = {
  path : []
};

event.addModel = (model)=> {
  for (let namespace in model) {
    let item = model[namespace];
    if (item.event) {
      let code = event.index++;
      event.on(item.event, (...params) => {
        const oldMsg = params[0];
        const newMsg = params[1];
        newMsg.path = oldMsg.path.slice();
        if (newMsg.path.indexOf(code) == -1) {
          newMsg.path.push(code);
          params.splice(0, 1);
          item.invoke(...params);
        }
      });
    } else {
      for (let name in item) {
        let eventName = item.event ? item.event : `${namespace}.${name}`;
        let code = event.index++;
        console.log(eventName);
        event.on(eventName, (...params) => {
          const oldMsg = params[0];
          const newMsg = params[1];
          newMsg.path = oldMsg.path.slice();
          if (newMsg.path.indexOf(code) == -1) {
            newMsg.path.push(code);
            params.splice(0, 1);
            item[name].invoke(...params);
          }
        });
      }
    }
  }
};

event.bindSource = (source)=> {
  source.onDataArrive((msg) => {
    event.emit(msg.event, event.defaultMsg, msg);
  });
  event.source = source;
};

event.send = (oldMsg,newMsg, isOut)=> {
  for (let name in oldMsg) {
    if (name != 'event' &&
      name != 'data' &&
      name != 'path'
    )
      newMsg[name] = oldMsg[name];
  }
  if (isOut && event.source){
    event.source.send(newMsg);
  }
  event.emit(newMsg.event, oldMsg, newMsg);
};

export default event;
