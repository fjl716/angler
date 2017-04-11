import events from '../../angler/events'

export default async function (container) {

  const list = await container.mongo.find('events', {pageSize: 1000});

  container.event(
    list.map(conf => {
      return events(conf);
    })
  );
  // require('./sidebar');
  // container.event(sidebar);
  // container.event(user);
}
