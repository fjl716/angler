import MongoDataBase,{Table} from './database/mongo'
import util from 'util'

const dbs={
  tables:{}
};
Object.assign(dbs, {
  async mongoDB(dbConf, ...models) {
    for (let name in dbConf) {
      dbs[name] = new MongoDataBase(dbConf[name]);
    }
    models.map(model=>{
      model.default.map(item=> {
        item = item.default;
        this.tables[item.table] = Table.prototype == item.constructor.prototype ? item : new Table(item);
        this.tables[item.table].link(dbs);
      });
    });
    for (let name in dbs.tables) {
      //关联数据库
      if (util.isObject(dbs.tables[name])) {
        this.tables[name].link(dbs);
        for (let field in dbs.tables[name].linkTable) {

          dbs.tables[this.tables[name].linkTable[field]].useTables.push({
            name: name,
            field: field
          });
        }
      }
    }
  },
});

export {
  MongoDataBase
}

export default dbs;