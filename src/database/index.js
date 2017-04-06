import dbs,{confMongoDB,confMySql,confSolrCore} from '../angler/dbs';
async function init() {
  await confMongoDB(dbs, {
      default: 'mongodb://localhost:27017/cloudroom',
      session: 'mongodb://localhost:27017/session',
      watcher: 'mongodb://localhost:27017/watcher',
    },
    require('./mongo')
  );
  await confMySql(dbs,
    {
      default: {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'cloudroom',
        tables: require('./mysql')
      }
    },
  );
  await confSolrCore(dbs, {
    host: 'localhost',
    port: 8983,
    cores: {
      users: {},
    }
  });

  // await dbs.mysql.tables.user.insert({
  //   id: '123456789012345678901234',
  //   name: 'admin',
  //   email: 'fjl716@163.com'
  // });
}

export {
  init
}
