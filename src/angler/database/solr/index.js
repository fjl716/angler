import SolrCore from './core'


async function confSolrCore(dbs,dbConf) {
  if (!dbs.solrs) dbs.solrs = {};
  const {host, port, cores} = dbConf;

  for (let name in cores) {
    dbs.solrs[name] = new SolrCore({
      host,
      port,
      core: name
    });
  }
}

export {
  confSolrCore
}

export default SolrCore
