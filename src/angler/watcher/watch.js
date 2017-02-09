export default {
  event: '{table}.watch',
  invoke: async function (angler, msg, table) {
    if (angler.tables[table]) {
      let obj = await angler.tables[table].findOne(msg.data);
      let watcher = await angler.dbs.watcher.findOne(
        table, {
          _id: obj._id
        }
      );
      if (!watcher) {
        angler.dbs.watcher.insert(
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
          angler.dbs.watcher.update(table, {
              _id: obj._id
            },
            {
              '$push': {
                'consumer': {
                  '_id': msg.link,
                  'host': msg.host
                }
              }
            });
        }
      }
      angler.event.send(
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

