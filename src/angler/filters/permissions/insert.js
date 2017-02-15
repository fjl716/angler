import {tables,event} from '../../../angler';

export default {
  event: 'insert.{table}',
  invoke: async function (msg, table) {
    let obj = await tables[table].findOne(msg.data);
    return true;
  }
};
