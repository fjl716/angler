export default class {
  constructor(container){
    this.container = container
  }

  async get({equipment}){
    const {session} = this.container.mongo;
    let obj = await session.findOne('session', {
      _id: equipment.__ID__
    });
    if (!obj) {
      obj = await session.insert('session', {
        _id: equipment.__ID__
      })
    }
    return obj;
  }

  async bindUser(){

  }
  async set({equipment}, data){
    const {session} = this.container.mongo;

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
  }
}
