import {MongoDataBase} from './database/mongo';
import Event from './event'
import angler,{initContainers,initMongo,initMySql,initSolr,initEvent} from './index'
import log4js from 'log4js'
log4js.configure({
  appenders: [{
    type: 'console',
    layout: {
      type: 'pattern',
      pattern: '[%[%5.5p%]]-%m'
    }
  }]
});

const logger = log4js.getLogger('angler');

async function init(step,func) {
  try {
    await func();
  }catch (ex){
    logger.fatal(`Initialize ${step} Failed`);
    return true;
  }
  logger.trace(`Initialize ${step} Finish`);
  return false;
}

async function fileLoader(model) {
  if (await init('Containers', async () => {
      await initContainers(model.container);
    }))
    return;

  if (await init('MongoDB', async () => {
      await initMongo(model.mongo);
    }))
    return;

  if (await init('MySql', async () => {
      await initMySql(model.mysql);
    }))
    return;

  if (await init('Solr', async () => {
      await initSolr(model.solr);
    }))
    return;

  if (await init('Event', async () => {
      await initEvent(model.event);
    }))
    return;
  return angler;
}

async function mongoLoader(confDB) {
  const conf = new MongoDataBase(confDB);
  await conf.init();
  logger.trace('link confDB');

  if (await init('Containers', async () => {
      const container = await conf.find('container', {pageSize: 1000});
      await initContainers(container);
    }))
    return;

  if (await init('MongoDB', async () => {
      const mongo = await conf.find('mongo', {pageSize: 1000});
      await initMongo(mongo);
    }))
    return;

  if (await init('MySql', async () => {
      const mysql = await conf.find('mysql', {pageSize: 1000});
      await initMySql(mysql);
    }))
    return;

  if (await init('Solr', async () => {
      const solr = await conf.find('solr', {pageSize: 1000});
      await initSolr(solr);
    }))
    return;

  if (await init('Event', async () => {
      const event = await conf.find('event', {pageSize: 1000});
      await initEvent(event);
    }))
    return;
  return angler;
}

async function mongoInitEvent(confDB) {
  const conf = new MongoDataBase(confDB);
  await conf.init();
  logger.trace('link confDB');
  Object.values(angler.containers).map(container => {
    container.events.clear();
  });
  if (await init('Event', async () => {
      const event = await conf.find('event', {pageSize: 1000});
      await initEvent(event);
    }))
    return;
  return angler;
}

export {
  mongoLoader,
  mongoInitEvent,
  fileLoader
}
