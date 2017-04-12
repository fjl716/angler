import events from '../../angler/events'

export default async function (container) {

  const list = await container.mongo.find('events', {pageSize: 1000});


  // require('./sidebar');
  // container.event(sidebar);
  // container.event(user);
}
