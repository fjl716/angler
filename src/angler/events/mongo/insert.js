import dbs from '../../dbs';

export default function (table) {
  return {
    event: `${table}.insert`,
    invoke: async function (params) {
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
  }
}
