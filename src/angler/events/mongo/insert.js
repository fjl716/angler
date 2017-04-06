import dbs from '../../dbs';
import {formatParams} from '../helper';

export default function (data) {
  const {event, collection} = formatParams(data, 'insert');
  return {
    event,
    invoke: async function (params) {
      const {container, packet} = params;
      let obj = await dbs.collection[collection].insert(packet.data);
      container.send(
        params,
        {
          packet: {
            event: `${collection}._insert`,
            data: obj
          }
        }, true
      );
    }
  }
}
