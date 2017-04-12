import MongoCollection from './MongoCollection'
import {Json2Bson,ObjectID} from './helper'
import MongoDataBase from './MongoDataBase'
import angler from '../../angler'

async function initMongo(list) {
  list.filter(item => item.name === 'default').map(async mongo => {
    const id = `C${mongo.container}`;
    if (angler.containers[id]) {
      const container = angler.containers[id];
      container.mongo = new MongoDataBase(mongo);
      await container.mongo.init();
    } else {
      console.warn(`not found ${mongo.container}`)
    }
  });

  list.filter(item => item.name !== 'default').map(mongo => {
    const id = `C${mongo.container}`;
    if (angler.containers[id]) {
      const container = angler.containers[id];
      container.mongo[mongo.name] = new MongoDataBase(mongo);
      container.mongo[mongo.name].init();
      Object.assign(
        container.mongo.collections,
        container.mongo.collections
      )
    } else {
      console.warn(`not found ${mongo.container}`)
    }
  });
  Object.values(angler.containers).map(container=>{
    if (container.mongo){
      for (let name in container.mongo.collections) {
        //关联数据库
        for (let field in container.mongo.collections[name].linkCollection) {
          container.mongo.collections[this.tables[name].linkCollection[field]].useCollections.push({
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
