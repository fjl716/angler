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
    this.event = new Event(this);
    this.tables = {};
    this.dbs = {};
  }

  addFilter(model) {

  }

  addEvent(model) {
    this.event.addModel(model);
  }

  bindSource(model){
    this.event.bindSource(model);
  }
}

export default Angler;
