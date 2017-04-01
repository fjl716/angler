import mysql from 'mysql'

class MySqlDataBase {
  constructor({host, user, password, database}) {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host,
      user,
      password,
      database
    });
  }

  query(sql, callback) {
    this.pool.query(sql, callback);
  }


}

export default MySqlDataBase
