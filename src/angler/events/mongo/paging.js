import dbs from '../../dbs';

export default function(table) {
  return {
    event: `${table}.paging`,
    invoke: async function (params) {
      const {container, packet} = params;
      if (dbs.tables[table]) {
        let list = await dbs.tables[table].find(packet.data);
        let size = await dbs.tables[table].find(packet.data.query);
        container.send(
          params,
          {
            packet: {
              event: `${table}.set`,
              data: {
                dataArray: list,
                total: size
              }
            }
          }, true
        );
      }
    }
  }
};
