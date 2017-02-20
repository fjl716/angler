import mongodb from 'mongodb'
const {ObjectID} = mongodb;
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
    const result = await this.database.collection(collection).findOne(query);
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

  async update(collection, query, newObj) {
    query = Json2Bson(query);
    newObj = Json2Bson(newObj);
    await this.database.collection(collection).updateOne(
      query,
      newObj
    );
    return await this.database.collection(collection).findOne(query);
  }

  async 'delete'(collection, query) {
    const result = await this.database.collection(collection).findOne(query);
    if (result){
      await this.database.collection(collection).deleteOne(query);
    }
    return result;
  }
}
export default MongoDataBase