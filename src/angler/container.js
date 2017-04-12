import Event from './event'
import MainBoard from './mainboard'
import Session from '../angler/session'
import angler from '../angler/angler'
import WebSocket,{JsonProtocol} from './sources/websocket';
const express = require('express');

class Container {
  constructor({source, protocol}) {
    this.events = new Event(this);
    this.source = source;
    this.protocol = protocol;
    this.session = new Session(this);
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

  event(event) {
    this.events.add(event);
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


async function initContainers (list) {
  list.map(container => {
    let source;
    switch (container.source.type) {
      case 'websocket':
        const port = container.source.port;
        const name = `P${port}`;
        if (!angler.express[name]) {
          angler.express[name] = express();
          angler.addStart(() => {
            angler.express[name].listen(port);
          });
        }
        source = new WebSocket(angler.express[name]);
        break;
      case 'tcp':

        break;
    }
    let protocol;
    switch (container.protocol) {
      case 'json':
        protocol = JsonProtocol;
        break;
    }
    angler.containers[`C${container._id}`] = new Container({source, protocol});
    angler.containers[`C${container._id}`].start();
  });
}

export {
  initContainers
}

export default Container;
