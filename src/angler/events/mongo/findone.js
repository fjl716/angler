import dbs from '../../dbs';

export default function(table) {
  return {
    event: `${table}.findone`,
    invoke: async function (params) {
      const {container, packet} = params;
      let obj = await dbs.tables[table].findOne(packet.data);
      container.send(
        params,
        {
          packet: {
            event: `${table}.findone`,
            data: obj
          }
        }, true
      );
    }
  }
};
