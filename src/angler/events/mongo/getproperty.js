import dbs from '../../dbs';

export default {
  event: '{table}.get->{property}',
  invoke: async function (params, table, property) {
    const {angler, packet} = params;
    if (dbs.tables[table]) {
      let obj = await dbs.tables[table].findOne(packet.data);
      let data = Object.assign({},packet.data);
      data['_id'] = obj['_id'];
      if (obj[property]){
        data[property] = obj[property]
      }
      angler.send(
        params,
        {
          packet: {
            event: `${table}.load`,
            data: data
          }
        }, true
      );
    }
  }
};
