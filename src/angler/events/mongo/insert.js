import dbs from '../../dbs';

export default function (event,collection) {
  return {
    event,
    invoke: async function (params) {
      const {container, packet} = params;
      let obj = await dbs.mongo.collections[collection].insert(packet.data);
      container.send(
        params,
        {
          packet: {
            event: `${collection}._insert`,
            data: obj
          }
        }, true
      );
    }
  }
}
