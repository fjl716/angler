export default {
  event: '{table}.insert',
  invoke: async function (angler,msg,table) {
    if (angler.tables[table]){
      let obj = await angler.tables[table].insert(msg.data);
      angler.event.send(
        msg,
        {
          event:`${table}.add`,
          data:obj
        },
        true
      );
    }
  }
};
