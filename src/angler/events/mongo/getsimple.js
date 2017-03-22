import dbs from '../../dbs';

export default function(table) {
  return {
    event: `${table}.getsimple`,
    invoke: async function (params) {
      const {container, packet} = params;
      let obj = await dbs.tables[table].findOneSimple(packet.data);
      container.send(
        params,
        {
          packet: {
            event: `${table}.setsimple`,
            data: obj
          }
        }, true
      );
    }
  }
};
