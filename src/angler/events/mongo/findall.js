export default function (event,collection) {
  return {
    event,
    result: {event: `${collection}._findall`},
    invoke: async function (probe) {
      let list = await probe.database.mongo.collections[collection].find({pageSize: 100});
      probe.send({
        data: list
      }, true);
    }
  }
};
