import Angler from './angler';
import remoting from './angler/remoting';
import mainboard from './angler/mainboard';
import WebSocket from './angler/sources/websocket';
import MarshalByRefObject from './angler/remoting/MarshalByRefObject';

function init() {
  const angler = new Angler();
  //增加过滤器
  angler.filter(require('./angler/permissions'));

  //增加消息
  angler.event(require('./angler/sysevents'));
  angler.event(require('./angler/watcher'));
  angler.event(remoting);

  //绑定消息数据源
  angler.source(new WebSocket(8080));

  class testRemoting extends MarshalByRefObject {
    constructor(__ID__) {
      super(__ID__)
    }

    sum(a, b, c, callback) {
      callback(a + b + c);
      return a + b + c;
    }
  }

  //添加为服务对象
  let test = new testRemoting('1');
  mainboard.addObject(test);
  return angler;
}

export {
  init
}