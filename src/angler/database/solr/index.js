import SolrCore from './SolrCore'

async function initSolr(dbs,dbConf) {
  if (!dbs.solr) dbs.solr = {};

  for(let name in dbConf) {
    const {host, port = 8983, cores} = dbConf[name];
    cores.default.map(conf => {
      const c = new SolrCore({
        host,
        port,
        conf
      });
      dbs.solr[c.name] = c;
    });
  }
}

export {
  initSolr
}

export default SolrCore
