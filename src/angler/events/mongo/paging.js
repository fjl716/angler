export default function (event,collection) {
  return {
    event,
    invoke: async function (params) {
      const {container, packet} = params;

      let list = await container.mongo.collections[collection].find(packet.data);
      let size = await container.mongo.collections[collection].size(packet.data.query);
      container.send(
        params,
        {
          packet: {
            event: `${collection}._paging`,
            data: {
              items: list,
              total: size
            }
          }
        },
        true
      );
    }
  }
};
