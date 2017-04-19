import mongodb from 'mongodb'
const {ObjectID} = mongodb;
import {Json2Bson} from './helper';
import MongoCollection from './MongoCollection';

class MongoDataBase {
  constructor({host,port=27017,database,collections=[]}) {
    this.url = `mongodb://${host}:${port}/${database}`;
    this.collections = {};
    collections.map(item => {
      this.collections[item.name] = new MongoCollection(this,item);
    });
  }

  init() {
    return new Promise((resolve, reject) => {
      mongodb.MongoClient.connect(this.url, (err, database) => {
        if (err) reject(err);
        this.database = database;
        resolve(database);
      });
    });
  }

  async insert(collection, newObj) {
    let result = await this.database.collection(collection).insertOne(Json2Bson(newObj));
    return result.ops[0];
  }

  async find(collection, {query={},pageSize=10,currentPage=1,orderBy}) {
    let result = await this.database.collection(collection).find(
      Json2Bson(query),
      {
        limit: pageSize,
        skip: (currentPage - 1) * pageSize
      }
    ).toArray();
    return result;
  }

  async size(collection,query) {
    let result = await this.database.collection(collection).find(Json2Bson(query)).count();
    return result;
  }

  async findOne(collection, query) {
    const result = await this.database.collection(collection).findOne(Json2Bson(query));
    if (result){
      for(let name in result){
        if (result[name].constructor){
          switch (result[name].constructor.name){
            case 'ObjectID':
              result[name] = result[name].toString();
              break;
          }
        }
      }
    }
    return result;
  }

  async update(collection, query, options) {
    query = Json2Bson(query);
    options = Json2Bson(options);
    const data = await this.database.collection(collection).findOne(query);
    if (data) {
      await this.database.collection(collection).updateOne(
        query,
        options
      );
      return await this.findOne(collection, {_id: data._id});
    }
    return null;
  }

  async 'delete'(collection, query) {
    query = Json2Bson(query);
    const result = await this.database.collection(collection).findOne(query);
    if (result){
      await this.database.collection(collection).deleteOne(query);
    }
    return result;
  }
}
export default MongoDataBase
