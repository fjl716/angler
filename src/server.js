const init = async ()=> {

  require('./weixin').test();

  //初始化数据库
  require('./dbconf').init();

  //初始化websocket
  require('./websocket').init();

  //初始化socket
  require('./socket').init();
};

let result = init();
