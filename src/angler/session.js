import dbs from './dbs'

export default {
  async get({equipment}){
    let obj = await dbs.session.findOne('session', {
      _id: equipment.__ID__
    });
    if (!obj) {
      obj = await dbs.session.insert('session', {
        _id: equipment.__ID__
      })
    }
    return obj;
  },
  async bindUser(){

  },
  async set({equipment}, data){
    let obj = await dbs.session.findOne('session', {
      _id: equipment.__ID__
    });
    if (obj) {
      await dbs.session.update('session', {
          _id: equipment.__ID__
        }, {
          '$set': data
        }
      );
    } else {
      obj = await dbs.session.insert('session', {
        _id: equipment.__ID__,
        data
      })
    }
    return obj;
  },
}
