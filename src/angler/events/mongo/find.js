
export default {
  event: '{table}.find',
  invoke: function (params, table) {
    console.log(table);
  }
};
