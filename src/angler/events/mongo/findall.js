import dbs from '../../dbs';

export default function(table) {
  return {
    event: `${table}.findall`,
    invoke: async function (params) {
      const {container, packet} = params;
      let list = await dbs.tables[table].find({});
      container.send(
        params,
        {
          packet: {
            event: `${table}.set`,
            data: list
          }
        }, true
      );
    }
  }
};
