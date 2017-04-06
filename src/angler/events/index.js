import mongo from './mongo'
import solr from './solr'

function createMongoEvent(table, ...events) {
  return events.map(event => {
    return event(table)
  })
}

export {
  createMongoEvent,
  mongo,
  solr
}
