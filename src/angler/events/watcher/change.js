export default {
  event: '{table}.change',
  invoke: async function (angler, equipment,msg, table) {
    // if (angler.tables[table]) {
    //   let watcher = await angler.dbs.watcher.findOne(
    //     table, {
    //       _id: msg.data._id
    //     }
    //   );
    //   watcher.consumer.map(item => {
    //     event.send(msg,
    //       {
    //         'event': `watch.change.${table}`,
    //         'host': item.host,
    //         'link': item._id,
    //         data: msg.data
    //       },
    //       false
    //     );
    //   });
    // }
  }
};
