import {confMongoDB,confMySql} from './angler/dbs';

async function init() {
  await confMongoDB(
    {
      default: 'mongodb://localhost:27017/cloudroom',
      session: 'mongodb://localhost:27017/session',
      watcher: 'mongodb://localhost:27017/watcher',
    },
    require('./tables')
  );
  await confMySql(
    {
      default:{
        host:'localhost',
        user:'root',
        password:'123456',
        database:'cloudroom'
      }
    }
  )
}

export {
  init
}
