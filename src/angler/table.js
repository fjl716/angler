import util from 'util';

import {ObjectID,Json2Bson} from './mongo';

class Table {
  static newId = () => new ObjectID();

  constructor(params) {
    const {name, init, dbName, simple,link} = params;
    this.name = name;
    this.dbName = dbName ? dbName : 'default';
    this.initData = init ? init : {};
    this.simpleFields = (simple instanceof Array) ? simple : ['_id'];
    this.linkTable = link;
    this.useTables = [];
  }

  link(dbs){
    this.db = dbs[this.dbName];
  }

  init(obj) {
    for (let name in this.initData) {
      let value = this.initData[name];
      if (util.isFunction(value)) {
        obj[name] = value(obj);
      } else if (util.isArray(value)) {
        obj[name] = value.slice();
      } else if (util.isObject(value)) {
        obj[name] = Object.assign({}, value);
      }
    }
    return Json2Bson(obj);
  }

  simple(obj) {
    const result = {};
    this.simpleFields.map(field => {
      let value = obj[field];
      if (value) {
        result[field] = value;
      }
    });
    return result;
  }

  insert(obj){
    return this.db.insert(this.name,this.init(obj));
  }

  update(query,newObj) {
    if (!newObj) {
      newObj = query;
      query = {
        '_id': query._id
      };
      delete newObj._id;
      newObj = {
        '$set': newObj
      };
    }
    return this.db.update(this.name,Json2Bson(query),Json2Bson(newObj));
  }

  findOne(query) {
    return this.db.findOne(this.name, Json2Bson(query));
  }

  delete(){

  }

  find(){

  }

  findSimple(){

  }



}
export default Table
