import Event from './event'
import {Close} from './equipment'
import MainBoard from './mainboard'


class Angler {
  constructor({source, protocol}) {
    this.events = new Event(this);
    this.source = source;
    this.protocol = protocol;
    source.bind(this, protocol);
  }

  filter(model) {

  }

  start(){
    this.source.start();
  }

  event(model) {
    this.events.addModel(model);
  }

  arrive(equipment, data) {
    if (data == Close) {

    } else {
      const packets = this.protocol.parse(data);
      if (packets) {
        packets.map(packet => {
          packet.__ID__ = equipment.__ID__;
          this.events.arrive(packet);
        })
      }
    }
  }

  send(oldMsg, newMsg, isOut) {
    for (let name in oldMsg) {
      if (name != 'event' &&
        name != 'data' &&
        name != 'path'
      )
        newMsg[name] = oldMsg[name];
    }
    if (isOut) {
      const equipment = MainBoard.get(newMsg.__ID__);
      if (equipment) {
        equipment.send(newMsg);
      }
      //this.source.send(newMsg);
    }
    //this.event.emit(newMsg.event,this.angler, oldMsg, newMsg);
  }

  out(equipment, packet) {
    const data = this.protocol.packet(equipment, packet);
    if (data){
      equipment.out(data);
    }
  }
}

export default Angler;
