import dbs from './dbs'
const {session} = dbs.mongoDB;

export default {
  async get({equipment}){
    let obj = await session.findOne('session', {
      _id: equipment.__ID__
    });
    if (!obj) {
      obj = await session.insert('session', {
        _id: equipment.__ID__
      })
    }
    return obj;
  },
  async bindUser(){

  },
  async set({equipment}, data){
    let obj = await session.findOne('session', {
      _id: equipment.__ID__
    });
    if (obj) {
      await session.update('session', {
          _id: equipment.__ID__
        }, {
          '$set': data
        }
      );
    } else {
      obj = await session.insert('session', {
        _id: equipment.__ID__,
        data
      })
    }
    return obj;
  },
}
