import tab from './tables';
import angler from './angler';
import {WebSocket} from './angler/sources';

import permissions from './angler/permissions';
import sysevents from './angler/sysevents';
import watcher from './angler/watcher';

import remoting,{server} from './angler/remoting';
const init = async ()=> {

  //增加过滤器
  angler.addFilter(permissions);

  //增加消息
  angler.addEvent(sysevents);
  angler.addEvent(watcher);
  angler.addEvent(remoting);

  //增加表
  angler.addTable(tab);

  //初始化外部资源
  angler.initDB({
    default: 'mongodb://localhost:27017/test',
    session: 'mongodb://localhost:27017/session',
    watcher: 'mongodb://localhost:27017/watcher',
  });
  //绑定消息数据源
  angler.bindEventSource(new WebSocket(8080));

  class testRemoting extends server.MarshalByRefObject {
    sum(a, b, c) {
      return a + b + c;
    }
  }

  //创建代理
  server.createProxy(new testRemoting());
  //配置消息来源
  //event.bindSource();

  //msg, path, func, isOut
  // event.arrive({
  //   host: 'receive1',
  //   link: '586319da479cb80379b5a065',
  //   event: 'insert.user',
  //   data: {
  //     '_id': '5878709c898ab51c40040d95',
  //     'name': '23456',
  //     'agent': 24
  //   }
  // });
  // event.send({
  //     'host': 'receive1',
  //     'link': '586319da479cb80379b5a065',
  //     'path': []
  //   },
  //   {
  //     'event': 'watch.user',
  //     data: {
  //       '_id': '5878709c898ab51c40040d95'
  //     }
  //   },
  //   false
  // );
  //
  // event.send({
  //     'host': 'receive1',
  //     'link': '586319da479cb80379b5a065',
  //     'path': []
  //   }, {
  //     'event': 'update.user',
  //     data: {
  //       '_id': '5878709c898ab51c40040d95',
  //       'name': '23456',
  //       'agent': 24
  //     }
  //   },
  //   false
  // );
  //5878709c898ab51c40040d96

  //console.log(await common.tables.user.insert({'name':'asdf'}));
};

let result = init();


