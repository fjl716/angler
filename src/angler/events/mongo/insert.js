export default function (event,collection) {
  return {
    event,
    invoke: async function (params) {
      const {container, packet} = params;
      let obj = await container.mongo.collections[collection].insert(packet.data);
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
