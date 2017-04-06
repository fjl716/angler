import dbs from '../../dbs';

export default function(collection) {
  return {
    event: `${collection}._update`,
    invoke: async function (params) {
      const {packet} = params;
      const obj = await dbs.collection[collection].simple(packet.data);
      dbs.collection[collection].useCollections.map(({name, field}) => {
        const set = {};
        set[`${field}.$`] = obj;
        const queue = {};
        queue[field] = {
          $elemMatch: {
            _id: obj._id
          }
        };
        dbs.collection[name].update(
          queue,
          {$set: set}
        )
      });
    }
  }
};
