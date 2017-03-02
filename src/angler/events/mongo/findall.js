import dbs from '../../dbs';

export default {
  event: '{table}.findall',
  invoke: async function (params, table) {
    const {container, packet} = params;
    if (dbs.tables[table]) {
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
