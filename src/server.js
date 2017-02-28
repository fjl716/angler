
const init = async ()=> {
  const system = {};
  const start = [];

  start.push(require('./weixin').init(system));

  //初始化数据库
  require('./dbconf').init(system);

  //初始化websocket
  require('./websocket').init(system);

  //初始化socket
  require('./socket').init(system);
};

let result = init();
