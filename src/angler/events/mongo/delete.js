export default function (event,collection) {
  return {
    event,
    result: {event: `${collection}._delete`},
    invoke: async function (probe) {
      let obj = await probe.database.mongo.collections[collection].delete(probe.packet.data);
      probe.send({
        data: obj
      }, true);
    }
  }
};
