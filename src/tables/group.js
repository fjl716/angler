import {Table} from '../angler/database/mongo'
export default {
  init: {
    _id: Table.newId,
  },
  simple: [
    '_id', 'name'
  ],
  link: {
    'users': 'user'
  },
}
