import {tables} from '../../angler';

export default {
  event: '{table}.load',
  invoke: async function (msg,table) {
    //console.log(msg,table);
  }
};
