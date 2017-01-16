import Table from './table';
const tables={};
import util from 'util';

tables.addModel = (model)=>{
  for(let name in model){
    let item = model[name];
    item.name = name;
    tables[name] = Table.prototype == item.constructor.prototype ? item : new Table(item);
  }
  return tables;
};

tables.link = (dbs)=> {
  for (let name in tables) {
    //关联数据库
    if (util.isObject(tables[name])) {
      tables[name].link(dbs);

      for (let field in tables[name].linkTable) {
        tables[tables[name].linkTable[field]].useTables.push({
          name: name,
          field: field
        });
      }
    }
  }
};

export default tables;
