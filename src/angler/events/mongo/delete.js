import dbs from '../../dbs';

export default function(table) {
  return {
    event: `${table}.delete`,
    invoke: async function (params) {
      const {container, packet} = params;
      if (dbs.tables[table]) {
        let obj = await dbs.tables[table].delete(packet.data);
        container.send(
          params,
          {
            packet: {
              event: `${table}.remove`,
              data: obj
            }
          }, true
        );
      }
    }
  }
};
