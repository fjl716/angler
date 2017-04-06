import MySqlDataBase from './MySqlDataBase'


async function confMySql(dbs,dbConf) {
  if (!dbs.mysql) dbs.mysql = {};
  for (let name in dbConf) {
    dbs.mysql[name] = new MySqlDataBase(dbConf[name]);
  }
  dbs.mysql.query = (...params) => dbs.mysql.default.query(...params);
  dbs.mysql.transaction = (...params) => dbs.mysql.default.transaction(...params);
}

export {
  confMySql
}

