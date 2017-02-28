import {Container,proxys} from '../angler';
import WebSocket,{JsonProtocol} from '../angler/sources/websocket';
import {TestServer} from './servers'

export function init() {

  let express = require('express')();

  const container = new Container({
    source: new WebSocket(express),
    protocol: JsonProtocol
  });

  const test1 = new TestServer('1',1);
  const test2 = new TestServer('2',2);

  proxys.addObject(test1,test2);

  //增加过滤器
  //angler.filter(require('../angler/filters/permissions/index'));

  //增加消息
  container.event(require('../angler/events/mongo/index'));
  // angler.event(require('../angler/events/watcher/index'));
  container.event(require('../angler/events/remoting/index'));

  container.event(require('./events/user/index'));
  container.event(require('./events/task/index'));

  container.start();

  express.listen(8080);

  return container;
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