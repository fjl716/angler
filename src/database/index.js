import dbs,{confMongoDB,confMySql,confSolrCore} from '../angler/dbs';
async function init() {
  // 'mongodb://localhost:27017/cloudroom',
  await confMongoDB(dbs, {
      default: {
        host: 'localhost',
        database: 'cloudroom',
        collections: require('./mongo')
      },
      session: {
        host: 'localhost',
        database: 'cloudroom',
      },
    },
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

  console.log(dbs.mysql.tables.user.updateSql({
    id: '123456789012345678901234',
    name: 'admin',
    email: 'fjl716@163.com'
  }));
}

export {
  init
}
