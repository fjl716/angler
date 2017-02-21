import dbs from '../../dbs';

export default {
  event: '{table}.remove',
  invoke: async function (params, table) {
    const {angler, packet} = params;
    if (!dbs.tables[table])
      return;
    const id = {
      _id: packet.data._id
    };
    dbs.tables[table].useTables.map(({name,field}) => {
      const queue = {};
      queue[field] = {
        $elemMatch: id
      };
      const pop = {};
      pop[field] = id;

      console.log(queue,pop);

      dbs.tables[name].update(
        queue,
        { $pop:  pop  }
      )
    });
  }
};
