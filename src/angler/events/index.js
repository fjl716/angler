import mongo from './mongo'
import mysql from './mysql'
import remoting from './remoting'
import solr from './solr'
import angler from '../angler'
let requireFromString = require('require-from-string');

const events = {
  mongo,
  solr,
  mysql,
  remoting,
};

async function initEvent(list) {
  list.map(conf => {
    const {path, container, event, result, invoke, params} = conf;
    const id = `C${container}`;
    if (angler.containers[id]) {
      const container = angler.containers[id];
      let module;
      if (invoke) {
        module = requireFromString(
          `module.exports = {
            invoke: async function (probe) {
              ${invoke}
            }
         };`);
        module.event = event;
        module.result = result;
      } else if (path) {
        let sp = path.split('.');
        let func = events;
        sp.map(name => {
          func = func[name];
        });
        module = func(event, params)
      }
      container.event(module);

    } else {
      console.warn(`not found ${container}`);
    }
  });
}

export {
  mongo,
  solr,
  mysql,
  remoting,
  initEvent,
}
