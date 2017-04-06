import dbs from '../../dbs';

export default function(collection) {
  return {
    event: `${collection}._delete`,
    invoke: async function (params) {
      const {container, packet} = params;
      const id = {
        _id: packet.data._id
      };
      dbs.collection[collection].useCollections.map(async({name, field}) => {
        const queue = {};
        queue[field] = {
          $elemMatch: id
        };
        const pop = {};
        pop[field] = id;
        const obj = await dbs.collection[name].update(
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
