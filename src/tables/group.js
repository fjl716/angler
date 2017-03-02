import {Table} from '../angler/database/mongo'
export default {
  name:'group',
  init: {
    _id: Table.newId,
    users:[],
  },
  simple: [
    '_id', 'name'
  ],
  link: {
    'users': 'user'
  },
}
