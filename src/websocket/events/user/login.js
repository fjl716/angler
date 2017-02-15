import dbs from '../../../angler/dbs';

export default {
  event: 'user.login',
  invoke: async function (angler, equipment, msg) {
    if (dbs.tables['user']) {
      let obj = await dbs.tables['user'].findOneSimple({
        user: msg.data.user,
        pass: msg.data.pass
      });
      if (obj) {
        angler.change(msg.__ID__, obj._id);
        msg.__ID__ = obj._id;
        angler.send(
          equipment,
          msg,
          {
            event: `user.loginComplete`,
            data: obj
          },
          true
        );
      } else {

      }
    }
  }
};
