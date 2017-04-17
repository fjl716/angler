export default function (event,collection) {
  return {
    event,
    result: {event: `${collection}._insert`},
    invoke: async function (probe) {
      let obj = await probe.database.mongo.collections[collection].insert(probe.packet.data);
      probe.send({
        data: obj
      }, true);
    }
  }
};

