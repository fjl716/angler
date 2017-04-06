import dbs from '../../dbs';
import {formatParams} from '../helper';

export default function (data) {
  const {event, collection} = formatParams(data, 'update$+{array}');
  return {
    event,
    invoke: async function (params, array) {
      const {container, packet} = params;
      const link = dbs.mongo.collections[collection].linkCollection[array];
      if (link) {
        let push = {};
        push[array] = await dbs.mongo.collections[link].findOneSimple(packet.query);

        let obj = await dbs.mongo.collections[collection].update(
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
