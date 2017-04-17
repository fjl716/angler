export default function (event,collection) {
  return {
    event,
    result: {event: `${collection}._paging`},
    invoke: async function (probe) {
      const {packet} = probe;
      let list = await probe.database.mongo.collections[collection].find(packet.data);
      let size = await probe.database.mongo.collections[collection].size(packet.data.query);
      probe.send({
        data: {
          items: list,
          total: size
        }
      }, true);
    }
  }
};
