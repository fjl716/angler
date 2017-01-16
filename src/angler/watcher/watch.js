import {tables,event,dbs} from '../../angler';
import {Json2Bson} from '../../angler/db';
export default {
  event: 'watch.{table}',
  invoke: async function (msg, table) {
    if (tables[table]) {
      let obj = await tables[table].findOne(msg.data);
      let watcher = await dbs.watcher.findOne(
        table, {
          _id: obj._id
        }
      );
      if (!watcher) {
        dbs.watcher.insert(
          table,
          Json2Bson({
            _id: obj._id,
            consumer: [{
              _id: msg.link,
              host: msg.host
            }]
          }))
      } else {
        if (-1 == watcher.consumer.findIndex(item => item._id == msg.link)) {
          dbs.watcher.update(table, Json2Bson({
              _id: obj._id
            }),
            Json2Bson({
              '$push': {
                'consumer': {
                  '_id': msg.link,
                  'host': msg.host
                }
              }
            })
          );
        }
      }
      event.send(
        msg,
        {
          event: `load.${table}`,
          data: obj
        },
        false
      );
    }
  }
};

