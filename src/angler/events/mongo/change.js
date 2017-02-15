export default {
  event: '{table}.change',
  invoke: function (angler, equipment,msg, table) {
    const simple = angler.tables[table].simple(msg.data);
    angler.tables[table].useTables.map(item => {
      let {name, field} = item;
      let query = {};
      query[`${field}._id`] = simple._id;
      let update = {};
      update[`${field}.$`] = simple;
      angler.tables[name].update(
        query,
        {
          '$set': update
        }
      );
    });
  }
};
