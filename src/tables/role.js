import {Table} from '../angler/database/mongo'
export default {
  name:'role',
  init: {
    _id: Table.newId,
  },
  simple: [
    '_id', 'name'
  ],
  link: {
  },
}
