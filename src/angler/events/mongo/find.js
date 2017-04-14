export default function (event,collection) {
  return {
    event,
    result: {event: `${collection}._find`},
    invoke: async function (probe) {
      let list = await probe.database.mongo.collections[collection].find(probe.packet.data);
      probe.send({
        data: list
      }, true);
    }
  }
};
