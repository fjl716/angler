import dbs from '../dbs';

export default {
  event: '{table}.insert',
  invoke: async function (angler,msg,table) {
    if (dbs.tables[table]){
      let obj = await dbs.tables[table].insert(msg.data);
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
