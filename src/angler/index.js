import Table from './mongo/table'
import Event from './event'
import util from 'util'

Date.prototype.toJSON = function() {
  return `D:${this.getTime()}`;
};

export{
  Table
}

class Angler {
  constructor() {
    this.events = new Event(this);
  }

  filter(model) {

  }

  event(model) {
    this.events.addModel(model);
  }

  source(model) {
    this.events.bindSource(model);
  }

  send(...params) {
    this.event.send(...params);
  }
}

export default Angler;
