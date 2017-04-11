export default function (event,collection) {
  return {
    event,
    invoke: async function (params) {
      const {container, packet} = params;
      let list = await container.dbs.mongo.collections[collection].find({pageSize:100});
      container.send(
        params,
        {
          packet: {
            event: `${collection}._findall`,
            data: list
          }
        }, true
      );
    }
  }
};
