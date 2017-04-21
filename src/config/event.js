export default [
  {
    "_id": "58ec3ed1097808014511045e",
    "event": "user.login",
    "result": [
      {event: 'user._login'}
    ],
    "invoke": `
      const {container, equipment, packet} = params;
      let obj = await container.mongo.collections['user'].findOneSimple({
        loginid: packet.data.loginid,
        password: packet.data.password
      });
      if (obj) {
        const newEquipment = container.change(equipment, obj._id);
        packet.__ID__ = obj._id;
        container.send(
          Object.assign(params, {equipment: newEquipment}),
          {
            packet: {
              event: 'user._login',
              data: obj
            }
          },
        );
      } else {
      }
    }`
  }
]