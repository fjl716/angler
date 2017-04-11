
export default function (event,collection) {
  return {
    event,
    invoke: async function (params) {
      const {container, packet} = params;
      let list = await container.mongo.collections[collection].find(packet.data);
      container.send(
        params,
        {
          packet: {
            event: `${collection}._find`,
            data: list
          }
        }, true
      );
    }
  }
};
