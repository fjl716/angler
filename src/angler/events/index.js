import mongo from './mongo'
import mysql from './mysql'
import remoting from './remoting'
import solr from './solr'
import angler from '../angler'
import util from 'util'
import log4js from 'log4js'

const logger = log4js.getLogger('angler');

let requireFromString = require('require-from-string');

const events = {
  mongo,
  solr,
  mysql,
  remoting,
};

async function initEvent(list) {
  list.map(conf => {
    try {
      const {path, event, result, invoke, params} = conf;
      const id = `C${conf.container}`;
      const container = angler.containers[id];
      if (!container) {
        logger.warn(`add event ${conf} \r\n not found ${container}`);
      } else {
        let module;
        if (invoke) {
          module = requireFromString(
            `module.exports = {
            invoke: async function (probe) {
              ${invoke}
            }
         };`);
          console.log(1);
          module.event = event;
          module.result = result;
        } else if (path) {
          let sp = path.split('.');
          let func = events;
          sp.map(name => {
            func = func[name];
          });
          if (!func){
            logger.fatal(`initialize ${conf.path} event`);
          }
          if (util.isArray(params)) {
            module = func(event, ...params);
          } else {
            module = func(event, params);
          }
          if (result){
            module.result = result;
          }
        }
        if (!module.result){
          module.result = [];
        } else if (!util.isArray(module.result)) {
          module.result = [module.result];
        }
        container.event(module);
        logger.trace(`${conf.container}.Event <- [${event} -> ${module.result.map(result=>result.event)}]`);
      }
    }catch(ex) {
      logger.fatal(`initialize event failed, ${conf.path},${ex}`);
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
