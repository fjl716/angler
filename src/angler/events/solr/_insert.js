import dbs from '../../dbs';
import solr from 'solr-client';

export default function (table) {
  return {
    event: `${table}._insert`,
    invoke: async function (params) {
      const {packet} = params;
      let result = await dbs.solrs.users.add({

      });
      console.log(result);
    }
  }
}
