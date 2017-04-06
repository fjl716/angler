import dbs from '../../dbs';
import {formatParams} from '../helper';

export default function (data) {
  const {event, table} = formatParams(data, 'insert');
  return {
    event,
    invoke: async function (params) {
      const {container, packet} = params;
      let obj = await dbs.mysql.transaction(async (query) => {
        let result = await query('INSERT INTO tblUser () VALUES ("123456789012345678901235","test")');
        console.log(result);
      });
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

