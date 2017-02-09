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
    this.tables = {};
    this.dbs = {};
  }

  filter(model) {

  }

  event(model) {
    this.events.addModel(model);
  }

  source(model){
    this.events.bindSource(model);
  }
}

export default Angler;
