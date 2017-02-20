import {MultiQueue} from './collection';
const watcherQueue = new MultiQueue();
const watcher = {
  add(task, space){
    watcherQueue.enqueue(task, space);
  },
  timeout(){
    let list = watcherQueue.dequeue();
    list.map(item => item.timeout());
  }
};

setInterval(function() {
  watcher.timeout()
}, 1000);

export default watcher;
