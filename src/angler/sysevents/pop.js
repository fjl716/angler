const event = /findSimple.([a-z]*)$/;

export default {
  event: '{table}.{array}.pop',
  invoke: function (msg,table,array) {
    console.log(table,array)
  }
};
