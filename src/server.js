import Angler from './angler'

const init = async ()=> {

  //初始化express
  await Angler.load(require('./express'));
  //初始化微信
  await Angler.load(require('./weixin'));
  //初始化数据库
  await Angler.load(require('./dbconf'));
  //初始化websocket
  await Angler.load(require('./websocket'));
  //开始执行
  await Angler.start();
};

let result = init();
