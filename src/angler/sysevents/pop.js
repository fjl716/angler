const event = /findSimple.([a-z]*)$/;

export default {
  event: 'pop.{table}.{array}',
  invoke: function (msg,table,array) {
    console.log(table,array)
  }
};
