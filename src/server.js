
const init = async ()=> {

  //初始化数据库
  require('./dbconf').init();

  //初始化websocket
  require('./websocket/conf').init();

  //初始化slangconf
  // require('./slangconf').init();
};

let result = init();
