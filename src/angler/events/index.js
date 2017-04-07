import mongo from './mongo'
import mysql from './mysql'
import remoting from './remoting'
import solr from './solr'

const events = {
  mongo,
  solr,
  mysql,
  remoting,
};

export {
  mongo,
  solr,
  mysql,
  remoting,
}




export default function (path,event,params) {
  let sp = path.split('.');
  let func = events;
  sp.map(name => {
    func = func[name];
  });
  return func(event, params)
}
