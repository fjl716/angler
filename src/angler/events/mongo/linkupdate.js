import dbs from '../../dbs';

export default function(collection) {
  return {
    event: `${collection}._update`,
    invoke: async function (params) {
      const {packet} = params;
      const obj = await dbs.mongo.collections[collection].simple(packet.data);
      dbs.mongo.collections[collection].useCollections.map(({name, field}) => {
        const set = {};
        set[`${field}.$`] = obj;
        const queue = {};
        queue[field] = {
          $elemMatch: {
            _id: obj._id
          }
        };
        dbs.mongo.collections[name].update(
          queue,
          {$set: set}
        )
      });
    }
  }
};
