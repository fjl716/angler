
export default function (event,collection) {
  return {
    event,
    result: {event: `${collection}._update`},
    invoke: async function (probe) {
      const {packet} = probe;
      let {query, set} = packet.data;
      if (!query) {
        query = {
          _id: packet.data._id
        };
        set = packet.data;
        delete set._id;
      }
      let obj = await probe.database.mongo.collections[collection].update(
        query,
        {'$set': set}
      );
      probe.send({
          data: obj
        }, true
      );
    }
  }
};
