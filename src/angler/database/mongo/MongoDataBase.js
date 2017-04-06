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
    let result = await this.database.collection(collection).insertOne(Json2Bson(newObj));
    return result.ops[0];
  }

  async find(collection, {query,pageSize,currentPage,orderBy}) {
    query = query ? query : {};
    pageSize = pageSize ? pageSize : 10;
    currentPage = currentPage ? currentPage : 0;

    let result = await this.database.collection(collection).find(
      query,
      {
        limit: pageSize,
        skip: currentPage * pageSize
      }
    ).toArray();
    return result;
  }

  async size(collection,query) {
    let result = await this.database.collection(collection).find(
      query,
    ).count();
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