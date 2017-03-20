import mongo from './mongo'

function createTableEvent(table,...events) {
  return events.map(event => {
    return event(table)
  })
}

export {
  createTableEvent,
  mongo
}
