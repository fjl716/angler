import dbs from '../../dbs';

export default {
  event: '{table}.update',
  invoke: async function (params, table) {
    const {container, packet} = params;
    if (dbs.tables[table]) {
      let obj = await dbs.tables[table].update(
        packet.data.query,
        {'$set': packet.data.set}
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
