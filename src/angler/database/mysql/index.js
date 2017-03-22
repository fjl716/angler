import mysql from 'mysql'

class MySqlDataBase {
  constructor({host, user, password, database}) {
    this.connection = mysql.createConnection({
      host: host,
      user: user,
      password: password,
      database: database
    });
    this.connection.connect();

  }

}

export default MySqlDataBase
