import dbs from '../../dbs';
import {formatParams} from '../helper';

export default function (data) {
  const {event, collection} = formatParams(data, 'findall');
  return {
    event,
    invoke: async function (params) {
      const {container, packet} = params;
      let list = await dbs.mongo.collections[collection].find({pageSize:100});
      container.send(
        params,
        {
          packet: {
            event: `${collection}._findall`,
            data: list
          }
        }, true
      );
    }
  }
};
