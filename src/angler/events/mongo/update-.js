import dbs from '../../dbs';

export default function(table) {
  return {
    event: `${table}.update-{array}`,
    invoke: async function (params, array) {
      const {container, packet} = params;
      let push = {};
      push[array] = packet.data.object;
      let obj = await dbs.tables[table].update(
        packet.data.query,
        {
          '$pop': push
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
};