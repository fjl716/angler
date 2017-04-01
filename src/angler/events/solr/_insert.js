import dbs from '../../dbs';
import solr from 'solr-client';

export default function (table) {
  return {
    event: `${table}._insert`,
    invoke: async function (params) {
      const {packet} = params;
      let client = solr.createClient();
      client.add(packet.data, function (err, obj) {
        if (err) {
          console.log(err);
        } else {
          console.log('Solr response:', obj);
        }
      })
    }
  }
}
