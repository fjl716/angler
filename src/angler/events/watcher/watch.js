export default {
  event: '{table}.watch',
  invoke: async function (container, equipment, msg, table) {
    if (container.tables[table]) {
      let obj = await container.tables[table].findOne(msg.data);
      let watcher = await container.dbs.watcher.findOne(
        table, {
          _id: obj._id
        }
      );
      if (!watcher) {
        container.dbs.watcher.insert(
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
          container.dbs.watcher.update(table, {
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
      container.send(
        equipment,
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

