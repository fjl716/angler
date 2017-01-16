import {tables,event} from '../../angler';

export default {
  event: 'insert.{table}',
  invoke: async function (msg,table) {
    if (tables[table]){
      let obj = await tables[table].insert(msg.data);
      event.send(
        msg,
        {
          event:`add.${table}`,
          data:obj
        },
        false
      );
    }
  }
};
