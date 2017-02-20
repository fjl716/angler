import dbs from '../../dbs';

export default {
  event: '{table}.delete',
  invoke: async function (params, table) {
    const {angler, packet} = params;
    if (dbs.tables[table]) {
      let obj = await dbs.tables[table].delete(packet.data);
      angler.send(
        params,
        {
          packet: {
            event: `${table}.remove`,
            data: obj
          }
        }, true
      );
    }
  }
};
