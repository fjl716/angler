export default {
  event: '{table}.change',
  invoke: async function (params, table) {
    const {angler, packet} = params;
    let watcher = await angler.dbs.watcher.findOne(
      table, {
        _id: packet.data._id
      }
    );
    watcher.consumer.map(item => {

      angler.send(
        params,
        {
          packet: {
            event: `${table}.change`,
            data: obj
          }
        }, true
      );

      event.send(msg,
        {
          'event': `watch.change.${table}`,
          // 'host': item.host,
          // 'link': item._id,
          data: packet.data
        },
        false
      );
    });
  }
};
