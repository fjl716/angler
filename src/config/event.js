export default [
  {
    "_id": "58ec3ed1097808014511045e",
    "container" : "58ec76b30978080145110474",
    "event": "user.login",
    "result": [
      {event: 'user._login'}
    ],
    "invoke": `
      const {equipment, packet,database} = probe;
      let obj = await database.mongo.collections['user'].findOneSimple({
        loginid: packet.data.loginid,
        password: packet.data.password
      });
      if (obj) {
        probe.changeId = obj._id;
        probe.send(
          {
              event: 'user._login',
              data: obj
          },true 
        );
      } else {
        
      }
    `
  }
]