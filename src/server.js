import {mongoLoader} from './angler/loader'
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

mongoLoader({
  host: 'localhost',
  database: 'angler'
}).then((angler)=> {
  if (!angler){
    logger.fatal('initialize angler failed');
    return;
  }
  angler.start();
});
