import dbs from '../../dbs';

export default {
  event: '{table}.get',
  invoke: async function (params, table) {
    const {angler, packet} = params;
    if (dbs.tables[table]) {
      let obj = await dbs.tables[table].findOne(packet.data);
      angler.send(
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
