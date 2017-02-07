import {tables,event} from '../../angler';

export default {
  event: 'insert.{table}',
  invoke: function(msg, table){
    return false;
  }
};
