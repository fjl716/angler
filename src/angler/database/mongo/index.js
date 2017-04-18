import MongoCollection from './MongoCollection'
import {Json2Bson,ObjectID} from './helper'
import MongoDataBase from './MongoDataBase'
import angler from '../../angler'
import log4js from 'log4js'
const logger = log4js.getLogger('angler');

async function initMongo(list) {

  list.filter(item => item.name === 'default').map(async mongo => {
    logger.trace(`initialize mongo default ${mongo.container}`);
    const id = `C${mongo.container}`;
    if (angler.containers[id]) {
      const container = angler.containers[id];
      container.database.mongo = new MongoDataBase(mongo);
      await container.database.mongo.init();
    } else {
      console.warn(`not found ${mongo.container}`)
    }
  });

  list.filter(item => item.name !== 'default').map(mongo => {
    const id = `C${mongo.container}`;
    if (angler.containers[id]) {
      const container = angler.containers[id];
      container.database.mongo[mongo.name] = new MongoDataBase(mongo);
      container.database.mongo[mongo.name].init();
      Object.assign(
        container.database.mongo.collections,
        container.database.mongo.collections
      )
    } else {
      console.warn(`not found ${mongo.container}`)
    }
  });
  Object.values(angler.containers).map(container=>{
    if (container.database.mongo){
      for (let name in container.database.mongo.collections) {
        //关联数据库
        for (let field in container.database.mongo.collections[name].linkCollection) {
          container.database.mongo.collections[this.tables[name].linkCollection[field]].useCollections.push({
            name: name,
            field: field
          });
        }
      }
    }
  });
}

export {
  ObjectID,
  Json2Bson,
  MongoCollection,
  MongoDataBase,
  initMongo,
}
