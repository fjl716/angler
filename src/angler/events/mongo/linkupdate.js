export default function(event,collection) {
  return {
    event: `${collection}._update`,
    invoke: async function (params) {
      const {container, packet} = params;
      const obj = await container.dbs.mongo.collections[collection].simple(packet.data);
      container.dbs.mongo.collections[collection].useCollections.map(({name, field}) => {
        const set = {};
        set[`${field}.$`] = obj;
        const queue = {};
        queue[field] = {
          $elemMatch: {
            _id: obj._id
          }
        };
        container.dbs.mongo.collections[name].update(
          queue,
          {$set: set}
        )
      });
    }
  }
};
