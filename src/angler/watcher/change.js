import {tables,dbs,event} from '../../angler';
import {Json2Bson} from '../../angler/db';

export default {
  event: '{table}.change',
  invoke: async function (msg, table) {
    if (tables[table]) {
      let watcher = await dbs.watcher.findOne(
        table, {
          _id: msg.data._id
        }
      );
      watcher.consumer.map(item => {
        event.send(msg,
          {
            'event': `watch.change.${table}`,
            'host': item.host,
            'link': item._id,
            data: msg.data
          },
          false
        );
      });
    }
  }
};
