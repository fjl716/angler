import dbs from '../../dbs';

export default function(table) {
  return {
    event: `${table}.paging`,
    invoke: async function (params) {
      const {container, packet} = params;

      let list = await dbs.tables[table].find(packet.data);
      let size = await dbs.tables[table].size(packet.data.query);

      container.send(
        params,
        {
          packet: {
            event: `${table}._paging`,
            data: {
              items: list,
              total: size
            }
          }
        },
        true
      );
    }
  }
};
