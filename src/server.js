import Angler from './angler';
import WebSocket from './angler/sources/websocket';
import dbs from './angler/dbs';
import remoting,{server} from './angler/remoting';
import util from 'util';

const init = async ()=> {
  //初始化外部资源
  dbs.mongoDB({
      default: 'mongodb://localhost:27017/test',
      session: 'mongodb://localhost:27017/session',
      watcher: 'mongodb://localhost:27017/watcher',
    },
    require('./tables')
  );

  const webserver = new Angler();
  //增加过滤器
  webserver.filter(require('./angler/permissions'));

  //增加消息
  webserver.event(require('./angler/sysevents'));
  webserver.event(require('./angler/watcher'));
  webserver.event(remoting);

  //绑定消息数据源
  webserver.source(new WebSocket(8080));

  class testRemoting extends server.MarshalByRefObject {
    sum(a, b, c) {
      return a + b + c;
    }
  }

  //添加为服务对象
  let test = new testRemoting();
  server.addObject(test);

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
