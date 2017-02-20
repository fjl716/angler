import dbs from '../../dbs';

export default {
  event: '{table}.push->{array}',
  invoke: async function (params, table, array) {
    const {angler, packet} = params;
    if (dbs.tables[table]) {
      let push = {};
      push[array] = packet.data.object;

      let obj = await dbs.tables[table].update(
        packet.data.query,
        {
          '$push':push
        }
      );

      angler.send(
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
