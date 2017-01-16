import mongodb from 'mongodb'
import util from 'util'

const {ObjectID} = mongodb;

const Json2Bson = (obj)=> {
  for (let name in obj) {
    let value = obj[name];
    if (util.isString(value)) {
      if (/^[0-9 a-f]{24}$/.test(value)) {
        obj[name] = new ObjectID(value);
      } else if (/^D:([0-9]*)$/.test(value)) {
        obj[name] = new Date(parseInt(/^D:([0-9]*)$/.exec(value)[1]));
      }
    } else if (util.isArray(value)) {
      value.map(item => {
        if (util.isObject(item)) {
          Json2Bson(item);
        }
      })
    } else if (util.isObject(value)) {
      Json2Bson(value)
    }
  }
  return obj;
};

class DataBase {
  static connection = (url) => {
    return new Promise((resolve, reject) => {
      mongodb.MongoClient.connect(url, (err, database) => {
        if (err) reject(error);
        resolve(database)
      });
    });
  };

  constructor(database) {
    this.database = database;
  }

  async insert(collection, newObj) {
    let result = await this.database.collection(collection).insertOne(newObj);
    return result.ops[0];
  }

  async findOne(collection, query) {
    return await this.database.collection(collection).findOne(query);
  }

  async update(collection, query, newObj) {
    await this.database.collection(collection).updateOne(
      query,
      newObj
    );
    return await this.database.collection(collection).findOne(query);
  }

  delete(msg) {
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
}

export default DataBase;