import Angler from './angler';
import WebSocket from './angler/sources/websocket';
import dbs from './angler/dbs';
import remoting,{server} from './angler/remoting';
import Slang from './angler/sources/slang';

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

  const test = new Angler();
  test.event(require('./events/meter'));
  const slang = new Slang({
    port: 8888,
    host: 'localhost',
    protocol: {
      types: {
        address: 'c:6'                      //定义地址类型为6个字节,类型名为address
      },
      parse: [
        '68',                               //开头为常量0x68
        {len: 'b'},                         //名称为len的变量，为一个字节
        {c: 'b'},                           //名称为c的变量，为一个字节
        {address: 'address'},               //名称为address变量为address类型（在type中自定义）
        '68',                               //常量0x68
        {count: 'b'},                       //名称为count的变量，为一个字节
        {
          '$count': 'count',                 //循环内容块，循环次数为变量count的数值
          router: [
            {'address': 'address'}
          ]
        },                                  //循环内容块内容为，address类型为address
        {
          '$case': {c: 1},                   //分支条件为，满足变量c==1
          data: [{'address': 'address'}]
        }, //满足条件后的结构为address
        '68',                               //常量0x16
      ]
    }
  });
  const bytes = [
    0x68,
    0x2,
    0x1,
    0x11, 0x22, 0x33, 0x44, 0x55, 0x66,
    0x68,
    0x2,
    0x11, 0x22, 0x33, 0x44, 0x55, 0x66,
    0x66, 0x55, 0x44, 0x33, 0x22, 0x11,
  ];
  slang.protocol.parse(
    bytes
  );
  // test.source(new Slang({
  //   port:1000,
  //   host:'localhost',
  //   types:{
  //     address: 'c:6'                      //定义地址类型为6个字节,类型名为address
  //   },
  //   protocol: [
  //     '68',                               //开头为常量0x68
  //     {len: 'b'},                         //名称为len的变量，为一个字节
  //     {c: 'b'},                           //名称为c的变量，为一个字节
  //     {address: 'address'},               //名称为address变量为address类型（在type中自定义）
  //     '68',                               //常量0x68
  //     {count: 'b'},                       //名称为count的变量，为一个字节
  //     {
  //       '$count': 'count',                 //循环内容块，循环次数为变量count的数值
  //       router: [
  //         {'address': 'address'}
  //       ]
  //     },                                  //循环内容块内容为，address类型为address
  //     {
  //       '$case': {c: 1},                   //分支条件为，满足变量c==1
  //       data: [{'address': 'address'}]
  //     }, //满足条件后的结构为address
  //     '68',                               //常量0x16
  //   ]
  // }));


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
