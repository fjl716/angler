import session from './session'
import tables from './tables'
import Table from './table'
import DataBase from './db'
import event from './event'
import filter from './filter'
import request from './request'
import sources from './sources';
import remoting from './remoting';

const dbs = {};

Date.prototype.toJSON = function() {
  return `D:${this.getTime()}`;
};

const common = async function ({dbConf}){
  for (let name in dbConf) {
    let database = await DataBase.connection(dbConf[name]);
    dbs[name] = new DataBase(database);
  }
  tables.link(dbs);
};
export {
  session,
  tables,
  dbs,
  event,
  Table,
  filter,
  request,
  sources,
  remoting,
}

export default common

