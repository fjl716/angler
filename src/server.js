import {mongoLoader} from './angler/loader'
import log4js from 'log4js'

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
