import dbs from '../../dbs';

import {formatParams} from '../helper';

export default function (data) {
  const {event, table} = formatParams(data, 'update');
  return {
    event,
    invoke: async function (params) {
      const {container, packet} = params;
      let {query, set}=packet.data;
      if (!query) {
        query = {
          _id: packet.data._id
        };
        set = packet.data;
        delete set._id;
      }
      let obj = await dbs.collection[table].update(
        query,
        {'$set': set}
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
