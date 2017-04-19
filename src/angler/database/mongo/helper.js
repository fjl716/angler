import util from 'util';
import mongodb from 'mongodb'
const {ObjectID} = mongodb;

function Json2Bson(obj) {
  for (let name in obj) {
    let value = obj[name];
    if (util.isString(value)) {
      if (/^[0-9 a-f]{24}$/.test(value)) {
        obj[name] = new ObjectID(value);
      } else if (/^D:([0-9]*)$/.test(value)) {
        obj[name] = new Date(parseInt(/^D:([0-9]*)$/.exec(value)[1]));
      }
    } else if (util.isArray(value)) {
      obj[name] = value.map(item => {
        if (util.isObject(item)) {
          return Json2Bson(item);
        } else if (/^[0-9 a-f]{24}$/.test(item)) {
          return new ObjectID(item);
        }
        return item;
      })
    } else if (util.isObject(value)) {
      Json2Bson(value)
    }
  }
  return obj;
}

export {
  Json2Bson,
  ObjectID
}
