import dbs from '../../dbs';
import {formatParams} from '../helper';

export default function (data) {
  const {event, table} = formatParams(data, 'findall');
  return {
    event,
    invoke: async function (params) {
      const {container, packet} = params;
      let list = await dbs.tables[table].find({pageSize:100});
      container.send(
        params,
        {
          packet: {
            event: `${table}._findall`,
            data: list
          }
        }, true
      );
    }
  }
};
