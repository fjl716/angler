import {MongoDataBase} from './database/mongo';
import angler,{initContainers,initMongo,initMySql,initSolr,initEvent} from './index'
import log4js from 'log4js'

const logger = log4js.getLogger('angler');

async function mongoLoader(confDB) {
  const conf = new MongoDataBase(confDB);
  await conf.init();
  logger.trace('link confDB');

  const container = await conf.find('container', {pageSize: 1000});
  await initContainers(container);
  logger.trace('initialize Containers finish');

  const mongo = await conf.find('mongo', {pageSize: 1000});
  await initMongo(mongo);
  logger.trace('initialize MongoDB finish');

  const mysql = await conf.find('mysql',{pageSize: 1000});
  logger.trace('initialize MySql finish');
  await initMySql(mysql);

  const solr = await conf.find('solr',{pageSize: 1000});
  await initSolr(solr);
  logger.trace('initialize Solr finish');

  const event = await conf.find('event',{pageSize: 1000});
  await initEvent(event);
  logger.trace('initialize Event finish');

  return angler;
}

export {
  mongoLoader
}
