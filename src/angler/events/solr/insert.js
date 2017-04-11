import dbs from '../../dbs';
import solr from 'solr-client';

export default function (table) {
  return {
    event: `${table}.insert`,
    invoke: async function (params) {
      const {container,packet} = params;
      let result = await container.solrs.users.add({

      });
      console.log(result);
    }
  }
}
