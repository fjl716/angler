import Angler from './angler';
import WebSocket from './angler/sources/websocket';
import JsonProtocol from './angler/sources/websocket/jsonprotocol';

export function init() {
  const angler = new Angler({
    source: new WebSocket(8080),
    protocol: JsonProtocol
  });

  //增加过滤器
  angler.filter(require('./angler/permissions'));

  //增加消息
  angler.event(require('./angler/sysevents'));
  angler.event(require('./angler/watcher'));
  //angler.event(remoting);

  angler.start();
  return angler;
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