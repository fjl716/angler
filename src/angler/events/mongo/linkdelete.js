export default function(event,collection) {
  return {
    event,
    invoke: async function (params) {
      const {container, packet} = params;
      const id = {
        _id: packet.data._id
      };
      container.dbs.mongo.collections[collection].useCollections.map(async({name, field}) => {
        const queue = {};
        queue[field] = {
          $elemMatch: id
        };
        const pop = {};
        pop[field] = id;
        const obj = await dbs.mongo.collections[name].update(
          queue,
          {$pop: pop}
        );
        container.send(
          params,
          {
            packet: {
              event: `${name}._update`,
              data: obj
            }
          }, true
        );
      });
    }
  }
};
