import dbs from '../../dbs';

export default {
  event: '{table}.insert',
  invoke: async function (params, table) {
    const {container, packet} = params;
    if (dbs.tables[table]) {
      let obj = await dbs.tables[table].insert(packet.data);
      container.send(
        params,
        {
          packet: {
            event: `${table}.add`,
            data: obj
          }
        }, true
      );
    }
  }
};
