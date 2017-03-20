import dbs from '../../dbs';

export default function(table) {
  return {
    event: `${table}.push>{array}`,
    invoke: async function (params, array) {
      const {container, packet} = params;
      if (dbs.tables[table]) {
        let push = {};
        push[array] = packet.data.object;

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
