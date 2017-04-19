import {mongoLoader,mongoInitEvent} from './angler/loader'
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
const project = 'angler';
// const project = 'manager';

const logger = log4js.getLogger('angler');

mongoLoader({
  host: '192.168.1.34',
  database: project
}).then((angler)=> {
  if (!angler){
    logger.fatal('initialize angler failed');
    return;
  }
  angler.express['P8080'].get('/', async function (req, res) {
    await mongoInitEvent({
      host: 'localhost',
      database: project
    });
    res.send('Fuck World');
  });
  angler.start();
});
