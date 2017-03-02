import {Table} from '../angler/database/mongo'
export default {
  table:'sidebar',
  init: {
    _id: Table.newId,
  },
  simple: [
    '_id', 'name'
  ],
  link: {
  },
}
