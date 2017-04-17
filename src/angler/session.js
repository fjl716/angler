export default class {
  constructor(database){
    this.database = database
  }

  async get(equipment){
    const {session} = this.database.mongo;
    let obj = await session.findOne('session', {
      _id: equipment
    });
    if (!obj) {
      obj = await session.insert('session', {
        _id: equipment
      })
    }
    return obj;
  }

  async bindUser(){

  }
  async set(equipment, data){
    const {session} = this.database.mongo;

    let obj = await session.findOne('session', {
      _id: equipment
    });
    if (obj) {
      await session.update('session', {
          _id: equipment
        }, {
          '$set': data
        }
      );
    } else {
      obj = await session.insert('session', {
        _id: equipment,
        data
      })
    }
    return obj;
  }
}
