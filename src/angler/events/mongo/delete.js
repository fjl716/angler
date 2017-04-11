export default function (event, collection) {
  return {
    event,
    invoke: async function (params) {
      const {container, packet} = params;
      let obj = await container.dbs.mongo.collections[collection].delete(packet.data);
      container.send(
        params,
        {
          packet: {
            event: `${collection}._delete`,
            data: obj
          }
        }, true
      );
    }
  }
};
