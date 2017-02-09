export default {
  event: '{table}.watch_change',
  invoke: async function (angler,msg, table) {
    console.log(msg,table);
  }
};
