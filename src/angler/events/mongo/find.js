import dbs from '../../dbs';
import {formatParams} from '../helper';

export default function (data) {
  const {event, collection} = formatParams(data, 'find');
  return {
    event,
    invoke: async function (params) {
      const {container, packet} = params;
      let list = await dbs.mongo.collections[collection].find(packet.data);
      container.send(
        params,
        {
          packet: {
            event: `${collection}._find`,
            data: list
          }
        }, true
      );
    }
  }
};
