import dbs,{confMongoDB,confMySql,confSolrCore} from '../angler/dbs';
async function init() {

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
  await confMySql(dbs, {
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
      default: {
        host: 'localhost',
        cores: require('./solr')
      }
    }
  );

  // await dbs.mysql.tables.user.insert({
  //   id: '123456789012345678901234',
  //   name: 'admin',
  //   email: 'fjl716@163.com'
  // });

  // dbs.mysql.tables.user.delete({
  //   id: '123456789012345678901234',
  //   name: 'admin1',
  //   email: 'fjl716@163.com'
  // });
}

export {
  init
}
