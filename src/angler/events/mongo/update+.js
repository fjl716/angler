import dbs from '../../dbs';
import {formatParams} from '../helper';

export default function (data) {
  const {event, table} = formatParams(data, 'update+{array}');
  return {
    event,
    invoke: async function (params, array) {
      const {container, packet} = params;
      let push = {};
      push[array] = packet.data.object;
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
            event: `${table}._update`,
            data: obj
          }
        }, true
      );
    }
  }
};
