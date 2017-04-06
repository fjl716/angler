import MongoDataBase,{confMongoDB} from './database/mongo'
import MySqlDataBase,{confMySql} from './database/mysql'
import SolrCore,{confSolrCore} from './database/solr'

const dbs= {};

export {
  MongoDataBase,
  MySqlDataBase,
  SolrCore,
  confMongoDB,
  confMySql,
  confSolrCore,
}

export default dbs;
