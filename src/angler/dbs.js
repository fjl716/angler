import MongoDataBase,{Table} from './mongo'
import util from 'util'

const dbs={
  tables:{}
};
Object.assign(dbs, {
  async mongoDB(dbConf, ...models) {
    for (let name in dbConf) {
      dbs[name] = new MongoDataBase(dbConf[name]);
    }
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
    models.map(model=>{
      for (let name in model) {
        let item = model[name];
        item.name = name;
        this.tables[name] = Table.prototype == item.constructor.prototype ? item : new Table(item);
        this.tables[name].link(dbs);
      }
    })
  },
});

export {
  MongoDataBase
}

export default dbs;