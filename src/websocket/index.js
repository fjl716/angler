import {Container,proxys} from '../angler';
import WebSocket,{JsonProtocol} from '../angler/sources/websocket';
import {TestServer} from './servers'

import {mongo,solr,createMongoEvent} from '../angler/events'


export async function init(system) {
  const container = new Container({
    source: new WebSocket(system.express),
    protocol: JsonProtocol
  });

  const test1 = new TestServer('1', 1);
  const test2 = new TestServer('2', 2);

  proxys.addObject(test1, test2);

  //增加过滤器
  //angler.filter(require('../angler/filters/permissions/index'));

  //增加消息
  container.event(createMongoEvent('calendar', ...mongo));
  container.event(createMongoEvent('group', ...mongo));
  container.event(createMongoEvent('region', ...mongo));
  container.event(createMongoEvent('role', ...mongo));
  container.event(createMongoEvent('sidebar', ...mongo));
  container.event(createMongoEvent('user', ...mongo));

  container.event(createMongoEvent('calendar', ...solr));
  container.event(createMongoEvent('group', ...solr));
  container.event(createMongoEvent('region', ...solr));
  container.event(createMongoEvent('role', ...solr));
  container.event(createMongoEvent('sidebar', ...solr));
  container.event(createMongoEvent('user', ...solr));

  container.event(require('../angler/events/remoting').default);

  container.event(require('./events/sidebar').default);
  container.event(require('./events/user').default);
  container.event(require('./events/task').default);

  return function () {
    container.start();
  };
}



// import remoting from './angler/remoting';
// import remotingMap from './angler/remoting/remotingMap';
// import MarshalByRefObject from './angler/remoting/MarshalByRefObject';
// class testRemoting extends MarshalByRefObject {
//   constructor(__ID__) {
//     super(__ID__)
//   }
//
//   sum(a, b, c, callback) {
//     callback(a + b + c);
//     return a + b + c;
//   }
// }

//添加为服务对象
// let test = new testRemoting('1');
// remotingMap.addObject(test);