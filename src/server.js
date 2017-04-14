import {mongoLoader} from './angler/loader'
import findall from './angler/events/mongo/findall'
mongoLoader({
  host: 'localhost',
  database: 'angler'
}).then((angler)=> {
  angler.start();

  // const container = Object.values(angler.containers)[0];
  // container.event({
  //   event: 'user.login',
  //   result: [
  //     {event: 'user._login'},
  //   ],
  //   invoke: async function (probe) {
  //     const {database, packet} = probe;
  //     let user = await database.mongo.collections['user'].findOneSimple({
  //       loginid: packet.data.loginid,
  //       password: packet.data.password
  //     });
  //     probe.changeId = user._id;
  //     if (user) {
  //       probe.send({
  //         equipment: user._id,
  //         data: user
  //       }, true);
  //     } else {
  //
  //     }
  //   }
  // });
  // container.event(findall(
  //   'sidebar.findall',
  //   'sidebar._findall',
  //   'sidebar'
  // ));
  // // container.event({
  // //   event:'sidebar.findall',
  // // });
  // container.event({
  //   event: 'user._login',
  //   result: [
  //     {event: 'sidebar.findall'},
  //     {event: 'sidebar.open'},
  //     {event: 'sidebar.select'},
  //   ],
  //   invoke: async function (probe) {
  //     const {equipment} = probe;
  //     probe.send({
  //       event: 'sidebar.findall'
  //     });
  //     const data = await probe.session.get(equipment);
  //     console.log(equipment);
  //     if (data.openKeys) {
  //       probe.send({
  //           event: 'sidebar.open',
  //           data: data.openKeys
  //         }, true
  //       );
  //     }
  //     if (data.selectedKey) {
  //       probe.send({
  //           event: 'sidebar.select',
  //           data: data.selectedKey
  //         }, true
  //       );
  //     }
  //   }
  // });
});
