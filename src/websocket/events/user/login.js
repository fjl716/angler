import {dbs} from '../../../angler';
export default {
  event: 'user.login',
  invoke: async function (params) {
    const {container, equipment,packet} = params;
    if (dbs.collection['user']) {
      let obj = await dbs.collection['user'].findOneSimple({
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
              event: `user._login`,
              data: obj
            }
          },
          1
        );
      } else {

      }
    }
  }
};
