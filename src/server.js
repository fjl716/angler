import Angler from './angler';
import WebSocket from './angler/sources/websocket';
import dbs from './angler/dbs';
import remoting from './angler/remoting';
import MarshalByRefObject from './angler/remoting/MarshalByRefObject';
import mainboard from './angler/mainboard';
import {Task,Drive,Channel} from './angler/drive';

const init = async ()=> {
  class ReadTask extends Task {
    constructor(obj) {
      super(obj)
    }

    first() {
      this.index = 1;
      return {
        pack: {
          key: 'read',
          data: '123'
        },
        span: 1
      }
    }

    arrive(pack) {
      if (this.index >= 3) {
        return this.complete();
      }
      if (pack.key == 'read') {
        this.index++;
        return this.next({
          pack: {
            key: 'read',
            data: '123'
          },
          span: 1
        });
      }
    }

    timeout() {
      console.log(`time out ${this.name}`);
      return this.complete();
    }
  }

  const channel = new Channel();
  const drive = new Drive(channel);
  drive.work(new ReadTask({name:'task1'}));
  channel.arrive({
    key:'read'
  });
  drive.work(new ReadTask({name:'task2'}));

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
