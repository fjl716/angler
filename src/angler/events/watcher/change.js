export default {
  event: '{table}.change',
  invoke: async function (params, table) {
    const {container, packet} = params;
    let watcher = await container.dbs.watcher.findOne(
      table, {
        _id: packet.data._id
      }
    );
    watcher.consumer.map(item => {

      container.send(
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
