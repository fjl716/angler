import dbs from '../../dbs';

export default {
  event: '{table}.remove',
  invoke: async function (params, table) {
    const {container, packet} = params;
    if (!dbs.tables[table])
      return;
    const id = {
      _id: packet.data._id
    };
    dbs.tables[table].useTables.map(async ({name,field}) =>  {
      const queue = {};
      queue[field] = {
        $elemMatch: id
      };
      const pop = {};
      pop[field] = id;
      const obj = await dbs.tables[name].update(
        queue,
        { $pop:  pop  }
      );
      container.send(
        params,
        {
          packet: {
            event: `${name}.change`,
            data: obj
          }
        }, true
      );
    });
  }
};
