import MongoCollection from './MongoCollection'
import {Json2Bson,ObjectID} from './helper'
import MongoDataBase from './MongoDataBase'
import util from 'util'

async function confMongoDB(dbs,dbConf, ...models) {
  if (!dbs.mongoDB) dbs.mongoDB = {};
  if (!dbs.collection) dbs.collection = {};
  for (let name in dbConf) {
    dbs.mongoDB[name] = new MongoDataBase(dbConf[name]);
  }
  models.map(model => {
    model.default.map(item => {
      item = item.default;
      dbs.collection[item.name] = MongoCollection.prototype == item.constructor.prototype ? item : new MongoCollection(item);
      dbs.collection[item.name].link(dbs.mongoDB);
    });
  });
  for (let name in dbs.collection) {
    //关联数据库
    if (util.isObject(dbs.collection[name])) {
      dbs.collection[name].link(dbs.mongoDB);
      for (let field in dbs.collection[name].linkTable) {
        dbs.collection[this.tables[name].linkTable[field]].useTables.push({
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
  MongoCollection,
  confMongoDB,
}

export default MongoDataBase;