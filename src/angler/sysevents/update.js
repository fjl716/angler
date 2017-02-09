export default {
  event: '{table}.update',
  invoke: async function (angler,msg,table) {
    if (angler.tables[table]){
      let obj = await angler.tables[table].update(msg.data);
      event.send(
        msg,
        {
          event:`change.${table}`,
          data:obj
        },
        false
      );
    }
  }
};
