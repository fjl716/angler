import MySqlDataBase from './MySqlDataBase'
import angler from '../../angler'

async function initMySql(list) {
  list.filter(item => item.name === 'default').map(mysql => {
    const id = `C${mysql.container}`;
    if (angler.containers[id]) {
      const database = angler.containers[id].database;
      database.mysql = new MySqlDataBase(mysql);
    } else {
      console.warn(`not found ${mysql.container}`)
    }
  });

  list.filter(item => item.name !== 'default').map(mysql => {
    if (angler.containers[id]) {
      const database = angler.containers[id].database;
      database.mysql[mysql.name] = new MySqlDataBase(mysql);
      Object.assign(
        database.mysql.tables,
        database.mysql[name].tables
      )
    } else {
      console.warn(`not found ${mysql.container}`)
    }
  });
}

export {
  initMySql
}

