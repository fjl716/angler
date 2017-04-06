import Table from './table'
import mongodb from 'mongodb'
import {Json2Bson} from './helper'
import MongoDataBase from './database'
import util from 'util'

const {ObjectID} = mongodb;

async function confMongoDB(dbs,dbConf, ...models) {
  if (!dbs.mongoDB) dbs.mongoDB = {};
  if (!dbs.tables) dbs.tables = {};
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

export {
  ObjectID,
  Json2Bson,
  Table,
  confMongoDB,
}

export default MongoDataBase;