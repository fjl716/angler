import dbs from '../../dbs';
import {formatParams} from '../helper';

export default function (data) {
  const {event, table} = formatParams(data, 'insert');
  return {
    event,
    invoke: async function (params) {
      const {container, packet} = params;
      let obj = await dbs.tables[table].insert(packet.data);
      container.send(
        params,
        {
          packet: {
            event: `${table}._insert`,
            data: obj
          }
        }, true
      );
    }
  }
}
