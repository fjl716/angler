import {mongoLoader,mongoInitEvent,fileLoader} from './angler/loader'
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
// const project = 'angler';
const project = 'manager';

const logger = log4js.getLogger('angler');

const dbconf = {
  host: 'localhost',
  database: project
};
import config from './config/config'

fileLoader(config).then((angler)=>{
  angler.start();
});

// mongoLoader(dbconf).then((angler)=> {
//   if (!angler){
//     logger.fatal('initialize angler failed');
//     return;
//   }
//   Object.values(angler.express)[0].get('/', async function (req, res) {
//     await mongoInitEvent(dbconf);
//     res.send('Fuck World');
//   });
//   angler.start();
// });
