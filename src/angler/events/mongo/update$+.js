import dbs from '../../dbs';
import {formatParams} from '../helper';

export default function (data) {
  const {event, table} = formatParams(data, 'update$+{array}');
  return {
    event,
    invoke: async function (params, array) {
      const {container, packet} = params;
      const link = dbs.collection[table].linkTable[array];
      if (link) {
        let push = {};
        push[array] = await dbs.collection[link].findOneSimple(packet.query);

        let obj = await dbs.collection[table].update(
          packet.data.query,
          {
            '$push': push
          }
        );
        container.send(
          params,
          {
            packet: {
              event: `${table}.change`,
              data: obj
            }
          }, true
        );
      }
    }
  }
};
