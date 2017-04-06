import {MongoCollection} from '../../angler/database/mongo'
export default {
  name:'user',
  init: {
    _id: MongoCollection.newId,
  },
  simple:[
    '_id','name','age'
  ]
}
