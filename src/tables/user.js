import Table from '../angler/mongo/table'
export default {
  init: {
    _id: Table.newId,
    arr:[],
  },
  simple:[
    '_id','name','age'
  ]
}
