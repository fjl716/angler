import Angler from './angler'

const init = async ()=> {

  //初始化微信
  Angler.load(require('./weixin'));
  //初始化数据库
  Angler.load(require('./dbconf'));
  //初始化websocket
  Angler.load(require('./websocket'));
  //初始化socket
  Angler.load(require('./socket'));

};

let result = init();
