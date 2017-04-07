import dbs from '../../dbs';
import {formatParams} from '../helper';

export default function (data) {
  const {event, table} = formatParams(data, 'delete');
  return {
    event,
    invoke: async function (params) {
      const {container, packet} = params;
      await dbs.mysql.tables[table].delete(
        packet.data
      );
    }
  }
}

