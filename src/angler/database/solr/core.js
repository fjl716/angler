const solr = require('solr-client');

class SolrCore {
  constructor({host,port,core}) {
    this.client = solr.createClient({
      host,
      port,
      core
    });
  }

  add(doc) {
    return new Promise((resolve, reject) => {
      const client = this.client;
      client.add(doc, function (err, obj) {
        if (err)
          reject(err);
        else
          client.commit(function (err, res) {
            if (err)
              reject(err);
            resolve(obj);
          })
      });
    });
  }

  search(q,filter){
    return new Promise((resolve, reject)=>{
      let query = this.client.createQuery();
      query.q(q).rangeFilter(filter);
      // query.q('Test').rangeFilter({ field : 'name', start : 100, end : '*'});
      this.client.search(query,function(err,obj){
        if(err) reject(err);
        resolve(obj.response.docs);
      });
    })
  }
}

export default SolrCore;
