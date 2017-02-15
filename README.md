#Angler

> 功能说明：

使用Angler进行消息队列获取消息后的数据的处理


##数据库配置
<pre><code>
  dbs.mongoDB({
      default: 'mongodb://localhost:27017/test',
      session: 'mongodb://localhost:27017/session',
      watcher: 'mongodb://localhost:27017/watcher',
    },
    require('./tables')
  );
</code></pre>
##Angler配置
Angler说明：

<pre><code>
  const angler = new Angler({
    source: new WebSocket(8080),
    protocol: JsonProtocol
  });

  //增加过滤器
  angler.filter(require('../angler/filters/permissions/index'));

  //增加消息
  angler.event(require('../angler/events/mongo/index'));
  angler.event(require('../angler/events/watcher/index'));
  angler.event(require('./events/user/index'));
  //angler.event(remoting);

  angler.start();
  return angler;
  
</code></pre>

> filter 过滤器

功能描述：
filter.addModel(permissions);


> tables 表配置



> event 事件说明





> 使用功能说明：

