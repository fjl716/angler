const event = /findSimple.([a-z]*)$/;

export default {
  event: '{table}.{array}_pop',
  invoke: function (msg,table,array) {
    console.log(table,array)
  }
};
