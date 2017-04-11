export default function (event,collection) {
  return {
    event,
    invoke: async function (params) {
      const {container, packet} = params;
      let {query, set}=packet.data;
      if (!query) {
        query = {
          _id: packet.data._id
        };
        set = packet.data;
        delete set._id;
      }
      let obj = await container.dbs.mongo.collections[collection].update(
        query,
        {'$set': set}
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
