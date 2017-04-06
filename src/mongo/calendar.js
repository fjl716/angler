import {MongoCollection} from '../angler/database/mongo'
export default {
  name:'calendar',
  init: {
    _id: MongoCollection.newId,
  },
  simple:[
    '_id','name'
  ]
}
