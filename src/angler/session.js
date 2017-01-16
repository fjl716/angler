import db from './db'

export default {
  async get(msg){
    let obj = await db.session.findOne('session', {
      _id: msg.link
    });
    if (!obj) {
      obj = await db.session.insert('session', {
        host: msg.host
      })
    }
    return obj;
  },
  async bindUser(){

  },
  async set(msg, data){
    let obj = await db.session.findOne('session', {
      _id: msg.link
    });
    if (obj){
      await db.session.update({
          _id: msg.link
        }, {
          '$set': {
            data: data
          }
        }
      );
    }else {
      obj = await db.session.insert('session', {
        host: msg.host,
        data:data
      })
    }
    return obj;
  },
  find(msg){

  }
}
