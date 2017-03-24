import dbs from '../../dbs';

export default function(table) {
  return {
    event: `${table}._delete`,
    invoke: async function (params) {
      const {container, packet} = params;
      const id = {
        _id: packet.data._id
      };
      dbs.tables[table].useTables.map(async({name, field}) => {
        const queue = {};
        queue[field] = {
          $elemMatch: id
        };
        const pop = {};
        pop[field] = id;
        const obj = await dbs.tables[name].update(
          queue,
          {$pop: pop}
        );
        container.send(
          params,
          {
            packet: {
              event: `${name}._update`,
              data: obj
            }
          }, true
        );
      });
    }
  }
};
