import {Table} from '../angler/database/mongo'
export default {
  name:'calendar',
  init: {
    _id: Table.newId,
  },
  simple:[
    '_id','name'
  ]
}
