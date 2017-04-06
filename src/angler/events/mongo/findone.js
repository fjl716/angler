import dbs from '../../dbs';
import {formatParams} from '../helper';

export default function (data) {
  const {event, collection} = formatParams(data, 'findone');
  return {
    event,
    invoke: async function (params) {
      const {container, packet} = params;
      let obj = await dbs.mongo.collections[collection].findOne(packet.data);
      container.send(
        params,
        {
          packet: {
            event: `${collection}._findone`,
            data: obj
          }
        }, true
      );
    }
  }
};
