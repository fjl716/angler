import {tables,event} from '../../angler';

export default {
  event: 'update.{table}',
  invoke: async function (msg,table) {
    if (tables[table]){
      let obj = await tables[table].update(msg.data);
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
