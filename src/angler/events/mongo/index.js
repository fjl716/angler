import _delete from './_delete'
import _update from './_update'
import deleteZ from './delete'
import find from './find'
import findall from './findall'
import findone from './findone'
import findsimple from './findsimple'
import insert from './insert'
import paging from './paging'
import update$A from './update$+'
import update$U from './update$^'
import updateA from './update+'
import update from './update'
import updateU from './update^'
import updateD from './update-'

function createTableEvent(table,...events) {
  return events.map(event => {
    return event(table)
  })
}

export {
  createTableEvent,
  _delete,
  _update,
  deleteZ,
  find,
  findall,
  findone,
  findsimple,
  insert,
  paging,
  update$A,
  update$U,
  updateA,
  update,
  updateU,
  updateD,
}

export default [
  _delete,
  _update,
  deleteZ,
  find,
  findall,
  findone,
  findsimple,
  insert,
  paging,
  update$A,
  update$U,
  updateA,
  update,
  updateU,
  updateD,
]
