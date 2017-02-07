import {tables,event} from '../../angler';

export default {
  event: '{table}.insert',
  invoke: async function (msg,table) {
    if (tables[table]){
      let obj = await tables[table].insert(msg.data);
      event.send(
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
