import mongo from './mongo'
import mysql from './mysql'
import remoting from './remoting'
import solr from './solr'
let requireFromString = require('require-from-string');

const events = {
  mongo,
  solr,
  mysql,
  remoting,
};

export {
  mongo,
  solr,
  mysql,
  remoting,
}

export default function (conf) {
  const {path, event, invoke, params} = conf;
  if (invoke){
    return requireFromString(`module.exports = {
    event: '${event}',
    invoke: async function (params) {
       ${invoke}
    }
  };`);
  }else if (path){
    let sp = path.split('.');
    let func = events;
    sp.map(name => {
      func = func[name];
    });
    return func(event, params)
  }
}
