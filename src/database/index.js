import {confMongoDB,confMySql,confSolrCore} from '../angler/dbs';
async function init() {


  // dbs.solr.user.client.delete('name','admin',function (err, obj) {
  //   console.log(obj);
  // });
  // dbs.solr.user.client.commit();
 // const data = await dbs.solr.user.add({
 //  const data = await dbs.solr.user.add({
 //    _id: 'a23456789012345678901234',
 //    name: 'admin',
 //    loginid: 'admin',
 //    email: 'fjl716@163.com',
 //    sex: 1,
 //  });
 //  console.log(data);
}

export {
  init
}
