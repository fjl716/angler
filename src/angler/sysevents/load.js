import {tables} from '../../angler';

export default {
  event: 'load.{table}',
  invoke: async function (msg,table) {
    //console.log(msg,table);
  }
};
