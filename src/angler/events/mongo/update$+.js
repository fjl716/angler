export default function (event,collection) {
  return {
    event,
    invoke: async function (params, array) {
      const {container, packet} = params;
      const link = container.dbs.mongo.collections[collection].linkCollection[array];
      if (link) {
        let push = {};
        push[array] = await container.dbs.mongo.collections[link].findOneSimple(packet.query);

        let obj = await container.dbs.mongo.collections[collection].update(
          packet.data.query,
          {
            '$push': push
          }
        );
        container.send(
          params,
          {
            packet: {
              event: `${collection}.change`,
              data: obj
            }
          }, true
        );
      }
    }
  }
};
