import dbs from '../../../angler/dbs';
import {TestTask} from '../../tasks';
export default {
  event: 'user.login',
  invoke: async function (params) {
    const {angler, packet} = params;

    console.log(packet);
    if (dbs.tables['user']) {
      let obj = await dbs.tables['user'].findOneSimple({
        user: packet.data.user,
        pass: packet.data.pass
      });
      if (obj) {
        angler.change(packet.__ID__, obj._id);
        packet.__ID__ = obj._id;
        angler.send(
          params,
          {
            packet: {
              event: `user.loginComplete`,
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
