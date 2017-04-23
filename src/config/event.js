export default [
  {
    "_id": "58ec3ed1097808014511045e",
    "container" : "58ec76b30978080145110474",
    "event": "user.login",
    "result": [
      {event: 'user._login'}
    ],
    "invoke": `
      const {container, equipment, packet} = probe;
      let obj = await container.mongo.collections['user'].findOneSimple({
        loginid: packet.data.loginid,
        password: packet.data.password
      });
      if (obj) {
        probe.changeId = obj._id;
        probe.send(
          {
              event: 'user._login',
              data: obj
          } 
        );
      } else {
      }
    `
  }
]