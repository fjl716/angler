import dbs from '../../dbs';

export default {
  event: '{table}.insert',
  invoke: async function ({angler, equipment, packet}, table) {
    if (dbs.tables[table]) {
      let obj = await dbs.tables[table].insert(packet.data);
      angler.send({
          equipment,
          previous: packet,
          packet: {
            event: `${table}.add`,
            data: obj
          }
        }, true
      );
    }
  }
};
