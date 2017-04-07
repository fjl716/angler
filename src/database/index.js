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
  // dbs.solr.user.client.delete('name','admin',function (err, obj) {
  //   console.log(obj);
  // });
  // dbs.solr.user.client.commit();
 // const data = await dbs.solr.user.add({
  const data = await dbs.solr.user.add({
    _id: 'a23456789012345678901234',
    name: 'admin',
    loginid: 'admin',
    email: 'fjl716@163.com',
    sex: 1,
  });
  console.log(data);
}

export {
  init
}
