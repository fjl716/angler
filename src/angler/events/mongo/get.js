export default {
  event: '{table}.get',
  invoke: async function (angler,msg, table) {
    if (angler.tables[table]) {
      let obj = await angler.tables[table].findOne(msg.data);
      event.send(msg, {
          event: `load.${table}`,
          data: obj
        },
        false
      );
    }
  }
};
