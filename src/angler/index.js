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

  start() {
    this.source.start();
  }

  event(model) {
    this.events.addModel(model);
  }

  arrive(equipment, packet) {
    this.events.arrive(equipment,packet);
  }

  change(oldId,newId) {
    const equipment = MainBoard.get(oldId);
    MainBoard.remove(equipment);
    equipment.__ID__ = newId;
    MainBoard.add(equipment);
  }

  send(equipment,oldMsg, newMsg, isOut) {
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
    }
    this.arrive(
      equipment,
      this.protocol.packet(equipment,newMsg)
    );
  }

  out(equipment, packet) {
    const data = this.protocol.serialize(equipment, packet);
    if (data) {
      equipment.out(data);
    }
  }
}

export default Angler;
