import MySqlDataBase from './MySqlDataBase'

async function confMySql(dbs,dbConf) {
  if (!dbs.mysql) {
    dbs.mysql = new MySqlDataBase(dbConf.default);
  }
  for (let name in dbConf) {
    if (name === 'default')
      continue;
    dbs.mysql[name] = new MySqlDataBase(dbConf[name]);
    Object.assign(
      dbs.mysql.tables,
      dbs.mysql[name].tables
    )
  }
}

export {
  confMySql
}

