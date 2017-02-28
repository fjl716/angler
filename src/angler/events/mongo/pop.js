import dbs from '../../dbs';

export default {
  event: '{table}.pop->{array}',
  invoke: async function (params, table, array) {
    const {container, packet} = params;
    if (dbs.tables[table]) {
      let push = {};
      push[array] = packet.data.object;

      let obj = await dbs.tables[table].update(
        packet.data.query,
        {
          '$pop':push
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
