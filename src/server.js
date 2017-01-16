import tab from './tables';
import angler,{tables,event} from './angler';
import sysevents from './angler/sysevents';
import watcher from './angler/watcher';


const init = async ()=> {
  //增加消息
  event.addModel(sysevents);
  event.addModel(watcher);

  //增加表
  tables.addModel(tab);

  //初始化外部资源
  await angler({
    dbConf: {
      default: 'mongodb://localhost:27017/test',
      session: 'mongodb://localhost:27017/session',
      watcher: 'mongodb://localhost:27017/watcher',
    },
    mqConf: {
      'host': 'localhost',
      'port': 61613,
    }
  });

  //msg, path, func, isOut
  event.send({
      'host': 'receive1',
      'link': '586319da479cb80379b5a065',
      'path': []
    },
    {
      'event': 'watch.user',
      data: {
        '_id': '5878709c898ab51c40040d95'
      }
    },
    false
  );

  event.send({
      'host': 'receive1',
      'link': '586319da479cb80379b5a065',
      'path': []
    }, {
      'event': 'update.user',
      data: {
        '_id': '5878709c898ab51c40040d95',
        'name': '23456',
        'agent': 24
      }
    },
    false
  );
  //5878709c898ab51c40040d96

  //console.log(await common.tables.user.insert({'name':'asdf'}));
};

let result = init();
