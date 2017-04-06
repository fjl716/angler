import dbs from '../../dbs';
import {formatParams} from '../helper';

export default function (data) {
  const {event, collection} = formatParams(data, 'paging');
  return {
    event,
    invoke: async function (params) {
      const {container, packet} = params;

      let list = await dbs.collection[collection].find(packet.data);
      let size = await dbs.collection[collection].size(packet.data.query);
      container.send(
        params,
        {
          packet: {
            event: `${collection}._paging`,
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
