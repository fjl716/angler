import util from 'util';
import mongodb from 'mongodb'
const {ObjectID} = mongodb;
import {Json2Bson} from './helper';
class MongoCollection {
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

  update(query,options) {
    return this.db.update(this.name,query,options);
  }

  findOne(query) {
    return this.db.findOne(this.name, query);
  }

  async findOneSimple(query) {
    let obj = await this.db.findOne(this.name, query);
    return this.simple(obj);
  }

  'delete'(query){
    return this.db.delete(this.name,query);
  }

  find(query){
    return this.db.find(this.name,query);
  }

  size(query){
    return this.db.size(this.name,query);
  }

  findSimple(){

  }



}
export default MongoCollection
