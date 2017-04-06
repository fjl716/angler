import mysql from 'mysql'

class MySqlDataBase {
  constructor({host, user, password, database}) {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      user,
      host,
      password,
      database
    });
  }

  query(sql, values) {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, values, function (error, results, fields) {
        if (error) reject(error);
        resolve(results);
      });
    });
  }

  transaction(callback) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection(function (err, connection) {
        if (err) reject(err);
        connection.beginTransaction(
          resolve(callback((sql, values) => {
            return new Promise((resolve, reject) => {
              connection.query(sql, values, function (error, results, fields) {
                if (error) reject(error);
                resolve(results);
                connection.release();
              });
            });
          }))
        )
      });
    });
  }
}

export default MySqlDataBase