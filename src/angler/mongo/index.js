import mongodb from 'mongodb'
const {ObjectID} = mongodb;
import Table from './table';
import {Json2Bson} from './helper';


class MongoDataBase {
  constructor(url) {
    mongodb.MongoClient.connect(url, (err, database) => {
      this.database = database
    });
  }

  async insert(collection, newObj) {
    let result = await this.database.collection(collection).insertOne(newObj);
    return result.ops[0];
  }

  async findOne(collection, query) {
    return await this.database.collection(collection).findOne(query);
  }

  async update(collection, query, newObj) {
    query = Json2Bson(query);
    newObj = Json2Bson(newObj);
    await this.database.collection(collection).updateOne(
      query,
      newObj
    );
    return await this.database.collection(collection).findOne(query);
  }

  'delete'(msg) {
    // if (!db) {
    //   mongodb.MongoClient.connect(mongodb_url, function (err, database) {
    //     if (err) throw err;
    //     db = database;
    //     db.collection("Cache").deleteOne({link: msg.link}, callback);
    //   });
    // } else {
    //   db.collection("Cache").deleteOne({link: msg.link}, callback);
    // }
  }
}

export {
  ObjectID,
  Json2Bson,
  Table
}

export default MongoDataBase;