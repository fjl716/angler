import mongo from './mongo'
import solr from './solr'

function createTableEvent(table,...events) {
  return events.map(event => {
    return event(table)
  })
}

export {
  createTableEvent,
  mongo,
  solr
}
