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

const logger = log4js.getLogger('angler');

mongoLoader({
  host: 'localhost',
  database: 'angler'
}).then((angler)=> {
  if (!angler){
    logger.fatal('initialize angler failed');
    return;
  }
  angler.express['P8080'].get('/', async function (req, res) {
    await mongoInitEvent({
      host: 'localhost',
      database: 'angler'
    });
    res.send('Fuck World');
  });
  angler.start();
});
