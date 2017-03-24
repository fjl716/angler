import dbs from '../../dbs';

export default function(table) {
  return {
    event: `${table}._update`,
    invoke: async function (params) {
      const {packet} = params;
      const obj = await dbs.tables[table].simple(packet.data);
      dbs.tables[table].useTables.map(({name, field}) => {
        const set = {};
        set[`${field}.$`] = obj;
        const queue = {};
        queue[field] = {
          $elemMatch: {
            _id: obj._id
          }
        };
        dbs.tables[name].update(
          queue,
          {$set: set}
        )
      });
    }
  }
};
