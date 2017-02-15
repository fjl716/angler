export default {
  event: '{table}.{array}_pop',
  invoke: function (angler,msg,table,array) {
    console.log(table,array)
  }
};
