import {mongoLoader} from './angler/loader'
mongoLoader({
  host: 'localhost',
  database: 'angler'
}).then((angler)=> {
  angler.start();
});
