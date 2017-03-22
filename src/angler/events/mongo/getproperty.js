import dbs from '../../dbs';

export default function(table) {
  return {
    event: `${table}.get>{property}`,
    invoke: async function (params, property) {
      const {container, packet} = params;
      let obj = await dbs.tables[table].findOne(packet.data);
      let data = Object.assign({}, packet.data);
      data['_id'] = obj['_id'];
      if (obj[property]) {
        data[property] = obj[property]
      }
      container.send(
        params,
        {
          packet: {
            event: `${table}.setproperty`,
            data: data
          }
        }, true
      );
    }
  }
};
