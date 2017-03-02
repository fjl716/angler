import Angler from './angler'

const init = async ()=> {

  //初始化express
  Angler.load(require('./express'));
  //初始化微信
  Angler.load(require('./weixin'));
  //初始化数据库
  Angler.load(require('./dbconf'));
  //初始化websocket
  Angler.load(require('./websocket'));
  //开始执行
  Angler.start();
};

let result = init();
