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
    this.client.autoCommit = true;
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
            };
          case 'int':
            return {
              name,
              value: function (obj) {
                return parseInt(obj[name]);
              }
            };
        }
      }
    });
    this.key = this.fields.find(field => field.name === key);
  }

  add(obj) {
    return new Promise((resolve, reject) => {
      const client = this.client;
      const doc = {};
      this.fields.map(field => {
        doc[field.name] = field.value(obj);
      });
      client.add(doc, function (err, obj) {
        if (err)
          reject(err);
        else
          resolve(obj);
      });
    });
  }

  'delete'(obj) {
    return new Promise((resolve, reject) => {
      const client = this.client;
      client.delete(this.key.name, this.key.value(obj), function (err, obj) {
        if (err) {
          console.log(err);
        } else {
          console.log(obj);
        }
      })
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
