import dbs from '../../dbs';

export default {
  event: '{table}.change',
  invoke: async function (params, table) {
    const {angler, packet} = params;
    if (!dbs.tables[table])
      return;
    const obj = await dbs.tables[table].simple(packet.data);
    dbs.tables[table].useTables.map(({name,field}) => {
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
        { $set:  set  }
      )
    });
  }
};
