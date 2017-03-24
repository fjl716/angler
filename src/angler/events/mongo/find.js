import dbs from '../../dbs';

export default function(table) {
  return {
    event: `${table}.find`,
    invoke: async function (params) {
      const {container, packet} = params;
      let list = await dbs.tables[table].find(packet.data);
      container.send(
        params,
        {
          packet: {
            event: `${table}._find`,
            data: list
          }
        }, true
      );
    }
  }
};
