import {Table} from '../angler/database/mongo'
export default {
  name:'region',
  init: {
    _id: Table.newId,
    arr:[],
  },
  simple:[
    '_id','name'
  ]
}
