export default function (event,result,collection) {
  console.log(event,result,collection);
  return {
    event,
    result: [{event: result}],
    invoke: async function (probe) {
      let list = await probe.database.mongo.collections[collection].find({pageSize: 100});
      probe.send({
        event: `${collection}._findall`,
        data: list
      }, true);
    }
  }
};
