import Emitter from 'pattern-emitter2';
import util from 'util';
import MainBoard from './mainboard'

const defaultMsg = {
  path : []
};
class Probe {
  constructor({container, equipment, packet}, event) {
    this.packet = packet;
    this.results = [];
    this.database = container.database;
    this.session = container.session;
    this.event = event;
    this.equipment = equipment.__ID__;
  }

  send({event, equipment=this.equipment, data},isOut=false) {
    if (event){
      const result = this.event.result.find(result => result.event === event);
      if (result) {
        this.results.push(Object.assign({},
          {equipment},
          result,
          {data,isOut},
        ))
      }
    }else{
      this.event.result.map(result => {
        this.results.push(Object.assign({},
          {equipment},
          result,
          {data,isOut},
        ))
      });
    }
  }
}

class Event {
  constructor(container) {
    this.event = new Emitter();
    this.container = container;
    this.index = 1;
  }

  add(event) {
    const code = this.index++;
    this.event.on(event.event, async (obj, ...params) => {
      const {equipment} = obj;
      if (util.isArray(event.result)) {
        event.result = [event.result];
      }
      const probe = new Probe(obj, event);
      await event.invoke(probe, ...params);
      if (probe.changeId){
        this.container.change(equipment, probe.changeId);
      }
      probe.results.map(result=>{
        this.container.send(event,result);
      });
      //
      // const previous = obj.previous ? obj.previous : defaultMsg;
      // const packet = obj.packet;
      //
      // packet.path = previous.path.slice();
      //
      // if (packet.path.indexOf(code) == -1) {
      //   packet.path.push(code);
      //   await event.invoke(obj, ...params);
      // }
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
