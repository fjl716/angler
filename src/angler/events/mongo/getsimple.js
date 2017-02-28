import dbs from '../../dbs';

export default {
  event: '{table}.getsimple',
  invoke: async function (params, table) {
    const {container, packet} = params;
    if (dbs.tables[table]) {
      let obj = await dbs.tables[table].findOneSimple(packet.data);
      container.send(
        params,
        {
          packet: {
            event: `${table}.loadsimple`,
            data: obj
          }
        }, true
      );
    }
  }
};
