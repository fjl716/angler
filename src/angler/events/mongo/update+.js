export default function (event,collection) {
  return {
    event,
    invoke: async function (params, array) {
      const {container, packet} = params;
      let push = {};
      push[array] = packet.data.object;
      let obj = await container.mongo.collections[collection].update(
        packet.data.query,
        {
          '$push': push
        }
      );
      container.send(
        params,
        {
          packet: {
            event: `${collection}._update`,
            data: obj
          }
        }, true
      );
    }
  }
};
