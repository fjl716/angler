import MongoDataBase,{Table} from './database/mongo'
import MySqlDataBase from './database/mysql'

import util from 'util'

const dbs= {
  mongoDB:{},
  tables: {},
  solrs: {},
  mysql:{},
};

async function confMongoDB(dbConf, ...models) {
  for (let name in dbConf) {
    dbs.mongoDB[name] = new MongoDataBase(dbConf[name]);
  }
  models.map(model => {
    model.default.map(item => {
      item = item.default;
      dbs.tables[item.name] = Table.prototype == item.constructor.prototype ? item : new Table(item);
      dbs.tables[item.name].link(dbs.mongoDB);
    });
  });
  for (let name in dbs.tables) {
    //关联数据库
    if (util.isObject(dbs.tables[name])) {
      dbs.tables[name].link(dbs.mongoDB);
      for (let field in dbs.tables[name].linkTable) {
        dbs.tables[this.tables[name].linkTable[field]].useTables.push({
          name: name,
          field: field
        });
      }
    }
  }
}

async function confMySql(dbConf) {
  for (let name in dbConf) {
    dbs.mysql[name] = new MySqlDataBase(dbConf[name]);
  }
}

export {
  MongoDataBase,
  MySqlDataBase,
  confMongoDB,
  confMySql,
}

export default dbs;
