import dbs from '../../dbs';

export default function(table) {
  return {
    event: `${table}.update`,
    invoke: async function (params, table) {
      const {container, packet} = params;
      let {query, set}=packet.data;
      if (!query) {
        query = {
          _id: packet.data._id
        };
        set = packet.data;
        delete set._id;
      }
      if (dbs.tables[table]) {
        let obj = await dbs.tables[table].update(
          query,
          {'$set': set}
        );
        container.send(
          params,
          {
            packet: {
              event: `${table}.change`,
              data: obj
            }
          }, true
        );
      }
    }
  }
};
