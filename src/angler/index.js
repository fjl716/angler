import Table from './table'
import MongoDataBase from './mongo'
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

  addTable(model) {
    for (let name in model) {
      let item = model[name];
      item.name = name;
      this.tables[name] = Table.prototype == item.constructor.prototype ? item : new Table(item);
    }
    return this.tables;
  };

  bindSource(model){
    this.event.bindSource(model);
  }

  async initMongoDB(dbConf) {
    for (let name in dbConf) {
      let database = await MongoDataBase.connection(dbConf[name]);
      this.dbs[name] = new MongoDataBase(database);
    }
    for (let name in this.tables) {
      //关联数据库
      if (util.isObject(this.tables[name])) {
        this.tables[name].link(this.dbs);

        for (let field in this.tables[name].linkTable) {
          this.tables[this.tables[name].linkTable[field]].useTables.push({
            name: name,
            field: field
          });
        }
      }
    }
  }
}

export default Angler;
