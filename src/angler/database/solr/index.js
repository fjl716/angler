import SolrCore from './SolrCore'

async function confSolrCore(dbs,dbConf) {
  if (!dbs.solrs) dbs.solrs = {};

  for(let name in dbConf) {
    const {host, port = 8983, cores} = dbConf[name];
    cores.default.map(conf => {
      const c = new SolrCore({
        host,
        port,
        conf
      });
      dbs.solrs[c.name] = c;
    });
  }
}

export {
  confSolrCore
}

export default SolrCore
