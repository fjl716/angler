import util from 'util';
const solr = require('solr-client');

class SolrCore {
  constructor({host,port,conf}) {
    const {name, core, key, fields} = conf;
    this.client = solr.createClient({
      host,
      port,
      core
    });
    this.name = name;
    this.fields = fields.map(field => {
      const name = Object.keys(field)[0];
      const value = Object.values(field)[0];
      if (util.isFunction(value)) {
        return {
          name,
          value
        }
      }
      if (util.isString(value)) {
        switch (value) {
          case 'string':
            return {
              name,
              value: function (obj) {
                return obj[name] + '';
              }
            }
        }
      }
    });
    this.key = this.fields.find(field => field.name === key);
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
