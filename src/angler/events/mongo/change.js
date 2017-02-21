import dbs from '../../dbs';

export default {
  event: '{table}.change',
  invoke: async function (params, table) {
    const {angler, packet} = params;
    // if (dbs.tables[table]) {
    //   let obj = await dbs.tables[table].update(
    //     packet.data.query,
    //     {'$set': packet.data.set}
    //   );
    //   angler.send(
    //     params,
    //     {
    //       packet: {
    //         event: `${table}.change`,
    //         data: obj
    //       }
    //     }, true
    //   );
    // }
  }
};
