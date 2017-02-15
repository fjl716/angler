import {Table} from '../angler/database/mongo'
export default {
  init: {
    _id: Table.newId,
    arr:[],
  },
  simple:[
    '_id','user','age'
  ]
}
