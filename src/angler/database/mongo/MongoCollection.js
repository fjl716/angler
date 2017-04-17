import util from 'util';
import mongodb from 'mongodb'
const {ObjectID} = mongodb;
import {Json2Bson} from './helper';
class MongoCollection {
  static newId = () => new ObjectID();

  constructor(db,params) {
    const {name, init, dbName, simple,link} = params;
    this.db = db;
    this.name = name;
    this.dbName = dbName ? dbName : 'default';

    this.initData=[];
    for (let name in init) {
      let type = init[name].substr(0,1);
      let data = init[name].substr(2);
      switch (type){
        case 't':
          switch (data){
            case 'newid':
              this.initData.push((obj)=>{
                obj[name] = new ObjectID();
              });
              break;
          }
          break;
      }
    }
    this.simpleFields = (simple instanceof Array) ? simple : ['_id'];
    this.linkCollection = link;
    this.useCollections = [];
  }

  init(obj) {
    this.initData.map(func=>{
      func(obj);
    });
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

  async findSimples(query) {
    let list = await this.db.find(this.name, query);
    return list.map(obj => this.simple(obj));
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
