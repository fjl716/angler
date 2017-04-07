import MongoCollection from './MongoCollection'
import {Json2Bson,ObjectID} from './helper'
import MongoDataBase from './MongoDataBase'
import util from 'util'

async function confMongoDB(dbs,dbConf) {
  if (!dbs.mongo) {
    dbs.mongo = new MongoDataBase(dbConf.default);
    await dbs.mongo.init();
  }

  for (let name in dbConf) {
    if (name === 'default')
      continue;
    dbs.mongo[name] = new MongoDataBase(dbConf[name]);
    await dbs.mongo[name].init();
    Object.assign(
      dbs.mongo.collections,
      dbs.mongo[name].collections
    )
  }
  for (let name in dbs.mongo.collections) {
    //关联数据库
    for (let field in dbs.mongo.collections[name].linkCollection) {
      dbs.mongo.collections[this.tables[name].linkCollection[field]].useCollections.push({
        name: name,
        field: field
      });
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