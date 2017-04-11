import {MongoCollection} from '../../angler/database/mongo'
export default {
  name:'sidebar',
  init: {
    _id: MongoCollection.newId,
  },
  simple: [
    '_id', 'name'
  ],
  link: {
  },
}
