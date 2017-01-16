import {tables,event} from '../../angler';

export default {
  event: 'change.{table}',
  invoke: function (msg, table) {
    const simple = tables[table].simple(msg.data);
    tables[table].useTables.map(item => {
      let {name, field} = item;
      let query = {};
      query[`${field}._id`] = simple._id;
      let update = {};
      update[`${field}.$`] = simple;
      tables[name].update(
        query,
        {
          '$set': update
        }
      );
    });
  }
};
