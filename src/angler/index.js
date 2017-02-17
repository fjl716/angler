import Event from './event'
import {Close} from './equipment'
import MainBoard from './mainboard'

class Angler {
  constructor({source, protocol}) {
    this.events = new Event(this);
    this.source = source;
    this.protocol = protocol;
    source.link({
      angler: this,
      protocol
    });
  }

  filter(model) {

  }

  start() {
    this.source.start();
  }

  event(model) {
    this.events.addModel(model);
  }

  arrive(params) {
    this.events.arrive(params);
  }

  change(oldId, newId) {
    const equipment = MainBoard.get(oldId);
    MainBoard.remove(equipment);
    equipment.__ID__ = newId;
    MainBoard.add(equipment);
  }

  send(original,block,isOut) {
    const equipment = block.equipment?block.equipment:original.equipment;
    const previous = original.packet;
    const packet = block.packet;

    for (let name in previous) {
      if (name != 'event' &&
        name != 'data' &&
        name != 'path'
      )
        packet[name] = previous[name];
    }
    if (isOut) {
      const equipment = MainBoard.get(packet.__ID__);
      if (equipment) {
        equipment.send(packet);
      }
    }
    this.arrive({
      equipment,
      packet: this.protocol.packet(equipment, packet)
    });
  }

  out({equipment, packet}) {
    const data = this.protocol.serialize({equipment, packet});
    if (data) {
      equipment.out(data);
    }
  }
}

export default Angler;
