import dbs from '../../dbs';

export default function(table) {
  return {
    event: `${table}.find`,
    invoke: async function (params) {
      const {container, packet} = params;
      if (dbs.tables[table]) {
        let list = await dbs.tables[table].find(packet.data);
        container.send(
          params,
          {
            packet: {
              event: `${table}.set`,
              data: list
            }
          }, true
        );
      }
    }
  }
};
