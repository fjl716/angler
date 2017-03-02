import {Table} from '../angler/database/mongo'
export default {
  table:'user',
  init: {
    _id: Table.newId,
  },
  simple:[
    '_id','name','age'
  ]
}
