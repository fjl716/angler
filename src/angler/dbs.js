import MongoDataBase,{Table} from './database/mongo'
import util from 'util'

const dbs= {
  mongoDB:{},
  tables: {},
  solrs: {},
};
Object.assign(dbs, {
  async mongoDB(dbConf, ...models) {
    for (let name in dbConf) {
      dbs.mongoDB[name] = new MongoDataBase(dbConf[name]);
    }
    models.map(model => {
      model.default.map(item => {
        item = item.default;
        this.tables[item.name] = Table.prototype == item.constructor.prototype ? item : new Table(item);
        this.tables[item.name].link(dbs.mongoDB);
      });
    });
    for (let name in dbs.tables) {
      //关联数据库
      if (util.isObject(dbs.tables[name])) {
        this.tables[name].link(dbs.mongoDB);
        for (let field in dbs.tables[name].linkTable) {

          dbs.tables[this.tables[name].linkTable[field]].useTables.push({
            name: name,
            field: field
          });
        }
      }
    }
  },
  solr(table, ...models){
    models.map(create => {
      dbs.solrs[table] = create(table)
    });
  }
});

export {
  MongoDataBase
}

export default dbs;