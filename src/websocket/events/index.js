import events from '../../angler/events'
import dbs from '../../angler/dbs'
import sidebar from './sidebar'
import user from './user'

export default async function (container) {

  const list = await dbs.mongo.find('events', {pageSize: 1000});

  container.event(
    list.map(conf => {
      return events(conf);
    })
  );
  // require('./sidebar');
  // container.event(sidebar);
  // container.event(user);

}
