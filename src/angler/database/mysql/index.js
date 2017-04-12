import MySqlDataBase from './MySqlDataBase'
import angler from '../../angler'

async function initMySql(list) {
  list.filter(item => item.name === 'default').map(mysql => {
    const id = `C${mysql.container}`;
    if (angler.containers[id]) {
      const container = angler.containers[id];
      container.mysql = new MySqlDataBase(mysql);
    } else {
      console.warn(`not found ${mysql.container}`)
    }
  });

  list.filter(item => item.name !== 'default').map(mysql => {
    if (angler.containers[id]) {
      const container = angler.containers[id];
      container.mysql[mysql.name] = new MySqlDataBase(mysql);
      Object.assign(
        container.mysql.tables,
        container.mysql[name].tables
      )
    } else {
      console.warn(`not found ${mysql.container}`)
    }
  });
}

export {
  initMySql
}

