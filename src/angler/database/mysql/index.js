import MySqlDataBase from './MySqlDataBase'

async function confMySql(dbs,dbConf) {
  if (!dbs.mysql)
    dbs.mysql = {
      tables: {},
      query: function (...params) {
        dbs.mysql.default.query(...params)
      },
      transaction: function (...params) {
        dbs.mysql.default.transaction(...params);
      }
    };
  for (let name in dbConf) {
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

