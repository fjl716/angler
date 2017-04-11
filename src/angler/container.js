import Event from './event'
import MainBoard from './mainboard'
import dbs from '../angler/dbs'
import session from '../angler/session'

class Container {
  constructor({source, protocol,port}) {
    this.events = new Event(this);
    this.source = source;
    this.protocol = protocol;
    this.session = session;
    this.dbs = dbs;
    source.link({
      container: this,
      protocol
    });
  }

  filter(model) {

  }

  start() {
    this.source.start();
  }

  event(events) {
    this.events.addEvents(events);
  }

  arrive(params) {
    this.events.arrive(params);
  }

  change(equipment, newId) {
    if (equipment.__ID__ == newId)
      return equipment;
    MainBoard.remove(equipment);
    const find = MainBoard.get(newId);
    if (find) {
      find.online({
        source: equipment.source,
        channel: equipment.channel
      });
      return find;
    }
    equipment.__ID__ = newId;
    MainBoard.add(equipment);
    return equipment;
  }

  send(original,block,type) {
    const equipment = block.equipment ? block.equipment : original.equipment;
    const previous = original.packet;
    const packet = block.packet;

    for (let name in previous) {
      if (name != 'event' &&
        name != 'data' &&
        name != 'path'
      )
        packet[name] = previous[name];
    }
    if (type) {
      const equipment = MainBoard.get(packet.__ID__);
      if (equipment) {
        equipment.send(packet);
      }else {
        console.log("equipment is null");
      }
      if (type !== true) {
        delete packet['__CALL_ID__'];
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
export default Container;
