import dbs from '../../dbs';
import {formatParams} from '../helper';

export default function (data) {
  const {event, table} = formatParams(data, 'find');
  return {
    event,
    invoke: async function (params) {
      const {container, packet} = params;
      let list = await dbs.collection[table].find(packet.data);
      container.send(
        params,
        {
          packet: {
            event: `${table}._find`,
            data: list
          }
        }, true
      );
    }
  }
};
