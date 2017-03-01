import dbs from './angler/dbs';

function init(){
  dbs.mongoDB({
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
