import {Container,proxys} from '../angler';
import WebSocket,{JsonProtocol} from '../angler/sources/websocket';
import {TestServer} from './servers'

export function init(system) {

  const container = new Container({
    source: new WebSocket(system.express),
    protocol: JsonProtocol
  });

  const test1 = new TestServer('1',1);
  const test2 = new TestServer('2',2);

  proxys.addObject(test1,test2);

  //增加过滤器
  //angler.filter(require('../angler/filters/permissions/index'));

  //增加消息
  container.event(require('../angler/events/mongo'));
  container.event(require('../angler/events/remoting'));
  container.event(require('./events/sidebar'));
  container.event(require('./events/user'));
  container.event(require('./events/task'));
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