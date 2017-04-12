import {MongoDataBase} from './angler/database/mongo';
import angler,{initContainers,initMongo,initMySql,initSolr,initEvent} from './angler'


async function init(confDB) {

  const conf = new MongoDataBase(confDB);
  await conf.init();

  const container = await conf.find('container', {pageSize: 1000});
  await initContainers(container);

  const mongo = await conf.find('mongo', {pageSize: 1000});
  await initMongo(mongo);

  const mysql = await conf.find('mysql',{pageSize: 1000});
  await initMySql(mysql);

  const solr = await conf.find('solr',{pageSize: 1000});
  await initSolr(solr);

  const event = await conf.find('event',{pageSize: 1000});
  await initEvent(event);

  angler.start();

  // let c = Object.values(angler.containers)[0];
  // console.log(c.session.get());
  // console.log('start ',Object.keys(angler.containers));
}

init({
  host: 'localhost',
  database: 'angler'
}).then();