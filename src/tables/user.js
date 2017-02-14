import {Table} from '../angler/mongo'
export default {
  init: {
    _id: Table.newId,
    arr:[],
  },
  simple:[
    '_id','name','age'
  ]
}
