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
    this.database = {};
    this.session = new Session(this.database);
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
    if (equipment.__ID__ === newId)
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

  send(event,result) {
    const equipment = MainBoard.get(result.equipment);
    if (!equipment) {
      console.warn(`equipment ${result.equipment} is null`);
      return false;
    }

    console.log(event);

    for (let name in event) {
      if (name !== 'event' &&
        name !== 'data' &&
        name !== 'path' &&
        name !== 'equipment' && name !== 'isOut'
      )
        result[name] = event[name];
    }
    if (result.isOut) {
      equipment.send(result);
      if (result.isOut !== true) {
        delete event['__CALL_ID__'];
      }
    }
    this.arrive({
      equipment,
      packet: this.protocol.packet(equipment, result)
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
