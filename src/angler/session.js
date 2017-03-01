import dbs from './dbs'

export default {
  async get(msg){
    let obj = await dbs.session.findOne('session', {
      _id: msg.link
    });
    if (!obj) {
      obj = await dbs.session.insert('session', {
        host: msg.host
      })
    }
    return obj;
  },
  async bindUser(){

  },
  async set(msg, data){
    let obj = await dbs.session.findOne('session', {
      _id: msg.link
    });
    if (obj){
      await dbs.session.update({
          _id: msg.link
        }, {
          '$set': {
            data: data
          }
        }
      );
    }else {
      obj = await dbs.session.insert('session', {
        host: msg.host,
        data:data
      })
    }
    return obj;
  },
  find(msg){

  }
}
