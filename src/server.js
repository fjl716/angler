

const init = async ()=> {

  //初始化数据库
  require('./dbconf').init();

  //初始化websocket
  const websocket = require('./websocket').init();

  //初始化slangconf
  // require('./slangconf').init();
};

let result = init();
