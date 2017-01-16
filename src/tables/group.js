import {Table} from '../angler'
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
