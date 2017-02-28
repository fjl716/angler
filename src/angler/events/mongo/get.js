import dbs from '../../dbs';

export default {
  event: '{table}.get',
  invoke: async function (params, table) {
    const {container, packet} = params;
    if (dbs.tables[table]) {
      let obj = await dbs.tables[table].findOne(packet.data);
      container.send(
        params,
        {
          packet: {
            event: `${table}.load`,
            data: obj
          }
        }, true
      );
    }
  }
};
