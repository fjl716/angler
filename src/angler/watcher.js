import {MultiQueue} from './collection';
const watcherQueue = new MultiQueue();
const watcher = {
  add(task, space){
    watcherQueue.enqueue({
      task,
      __TIME_LABEL: task.__TIME_LABEL
    }, space);
  },
  timeout(){
    let list = watcherQueue.dequeue();
    list.map(item => {
      const {task, __TIME_LABEL} = item;
      if (task.__TIME_LABEL == __TIME_LABEL) {
        task.timeout();
      }
    });
  }
};

setInterval(function() {
  watcher.timeout()
}, 1000);

export default watcher;
