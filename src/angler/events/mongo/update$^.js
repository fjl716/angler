import dbs from '../../dbs';

export default function(table) {
  return {
    event: `${table}.update$^{array}`,
    invoke: async function (params, array) {
      const {container, packet} = params;
      const link = dbs.tables[table].linkTable[array];
      if (link) {
        let push = {};
        push[array] = await dbs.tables[link].findOneSimple(packet.query);

        let obj = await dbs.tables[table].update(
          packet.data.query,
          {
            '$push': push
          }
        );
        container.send(
          params,
          {
            packet: {
              event: `${table}.change`,
              data: obj
            }
          }, true
        );
      }
    }
  }
};
