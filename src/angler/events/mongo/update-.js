export default function (event,collection,array) {
  return {
    event,
    result: {event: `${collection}.change`},
    invoke: async function (probe) {
      const {packet, database} = probe;
      let push = {};
      push[array] = packet.data.object;
      let obj = await database.mongo.collections[collection].update(
        probe.packet.data.query,
        {
          '$pop': push
        }
      );
      probe.send({
          data: obj
        }, true
      );
    }
  }
};
