import dbs from '../../dbs';

export default function(table) {
  return {
    event: `${table}._update`,
    invoke: async function (params) {
      const {packet} = params;
      const obj = await dbs.collection[table].simple(packet.data);
      dbs.collection[table].useTables.map(({name, field}) => {
        const set = {};
        set[`${field}.$`] = obj;
        const queue = {};
        queue[field] = {
          $elemMatch: {
            _id: obj._id
          }
        };
        dbs.collection[name].update(
          queue,
          {$set: set}
        )
      });
    }
  }
};
