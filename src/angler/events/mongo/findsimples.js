export default function (event,collection) {
  return {
    event,
    result: {event: `${collection}._findsimples`},
    invoke: async function (probe) {
      let list = await probe.database.mongo.collections[collection].findSimples(probe.packet.data);
      probe.send({
        data: list
      }, true);
    }
  }
};
