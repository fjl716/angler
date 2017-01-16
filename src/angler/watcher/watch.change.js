import {tables,dbs} from '../../angler';
import {Json2Bson} from '../../angler/db';

export default {
  event: 'watch.change.{table}',
  invoke: async function (msg, table) {
    console.log(msg,table);
  }
};
