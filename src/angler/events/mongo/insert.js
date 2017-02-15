import dbs from '../../dbs';

export default {
  event: '{table}.insert',
  invoke: async function (angler, equipment,msg,table) {
    if (dbs.tables[table]){
      let obj = await dbs.tables[table].insert(msg.data);
      angler.send(
        equipment,
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
