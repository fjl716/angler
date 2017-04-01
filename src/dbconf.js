import {confMongoDB} from './angler/dbs';

async function init() {
  await confMongoDB(
    {
      default: 'mongodb://localhost:27017/cloudroom',
      session: 'mongodb://localhost:27017/session',
      watcher: 'mongodb://localhost:27017/watcher',
    },
    require('./tables')
  );
}

export {
  init
}
