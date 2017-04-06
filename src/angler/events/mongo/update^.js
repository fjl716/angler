import dbs from '../../dbs';
import {formatParams} from '../helper';

export default function (data) {
  const {event, collection} = formatParams(data, 'update$^{array}');
  return {
    event,
    invoke: async function (params, array) {
      const {container, packet} = params;
      const link = dbs.collection[collection].linkCollection[array];
      if (link) {
        let push = {};
        push[array] = await dbs.collection[link].findOneSimple(packet.query);

        let obj = await dbs.collection[collection].update(
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
