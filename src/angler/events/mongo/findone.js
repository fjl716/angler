export default function (event,collection) {
  return {
    event,
    invoke: async function (params) {
      const {container, packet} = params;
      let obj = await container.mongo.collections[collection].findOne(packet.data);
      container.send(
        params,
        {
          packet: {
            event: `${collection}._findone`,
            data: obj
          }
        }, true
      );
    }
  }
};
