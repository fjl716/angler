export default function (event,collection) {
  return {
    event,
    result: {event: `${collection}._paging`},
    invoke: async function (probe) {
      let list = await probe.database.mongo.collections[collection].find(probe.data);
      let size = await probe.database.mongo.collections[collection].size(probe.data.query);
      probe.send({
        data: {
          items: list,
          total: size
        }
      }, true);
    }
  }
};

