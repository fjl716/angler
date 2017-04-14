export default function (event,collection) {
  return {
    event,
    result: {event: `${collection}._findone`},
    invoke: async function (probe) {
      let obj = await probe.database.mongo.collections[collection].findOne(probe.packet.data);
      probe.send({
        data: obj
      }, true);
    }
  }
};
