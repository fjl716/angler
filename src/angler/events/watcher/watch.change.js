export default {
  event: '{table}.watch_change',
  invoke: async function (angler, equipment,msg, table) {
    console.log(msg,table);
  }
};
