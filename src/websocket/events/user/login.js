import dbs from '../../../angler/dbs';

export default {
  event:'user.login',
  invoke: async function (angler, msg) {
    if (dbs.tables['user']) {
      let obj = await dbs.tables['user'].findOneSimple({
        user: msg.data.user,
        pass: msg.data.pass
      });
      if (obj) {
        delete obj.pass;
        angler.send(
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
