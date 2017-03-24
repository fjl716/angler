import {dbs} from '../../../angler';
export default {
  event: 'user.login',
  invoke: async function (params) {
    const {container, equipment,packet} = params;

    if (dbs.tables['user']) {
      let obj = await dbs.tables['user'].findOneSimple({
        loginid: packet.data.loginid,
        password: packet.data.password
      });
      if (obj) {
        const newEquipment = container.change(equipment, obj._id);
        packet.__ID__ = obj._id;
        container.send(
          Object.assign(params,{equipment:newEquipment}),
          {
            packet: {
              event: `user.logincomplete`,
              data: obj
            }
          },
          true
        );
      } else {

      }
    }
  }
};
