import dbs from '../../dbs';
import {formatParams} from '../helper';

export default function (data) {
  const {event, table} = formatParams(data, 'paging');
  return {
    event,
    invoke: async function (params) {
      const {container, packet} = params;

      let list = await dbs.collection[table].find(packet.data);
      let size = await dbs.collection[table].size(packet.data.query);
      container.send(
        params,
        {
          packet: {
            event: `${table}._paging`,
            data: {
              items: list,
              total: size
            }
          }
        },
        true
      );
    }
  }
};
