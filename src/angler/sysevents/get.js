import {tables,event} from '../../angler';

export default {
  event: 'get.{table}',
  invoke: async function (msg, table) {
    if (tables[table]) {
      let obj = await tables[table].findOne(msg.data);
      event.send(msg, {
          event: `load.${table}`,
          data: obj
        },
        false
      );
    }
  }
};
