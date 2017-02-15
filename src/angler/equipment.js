import {Queue} from './collection';
import watcher from './watcher';

class Equipment {
  constructor(id, source,channel) {
    this.__ID__ = id;
    this.source = source;
    this.queue = new Queue();
    this.channel = channel;
  }

  online(channel){
    if (!this.current) {
      this.start();
    }
  }

  work(task) {
    task.drive = this;
    this.queue.enqueue(task);
    if (!this.current) {
      this.start();
    }
  }

  start() {
    this.current = null;
    if (this.queue.size() > 0) {
      this.current = this.queue.dequeue();
      const {pack, span} = this.current.first();
      console.log(this.channel);
      this.channel.send(pack);
      watcher.add(this.current, span);
    }
  }

  arrive(data) {
    this.source.arrive(this, data);
  }

  // arrive(pack) {
  //   if (this.current) {
  //     const result = this.current.arrive(pack);
  //     if (result) {
  //       const {pack, span} =result;
  //       console.log(this.channel);
  //       this.channel.send(pack);
  //       watcher.add(this.current, span);
  //     }
  //   }
  // }

  send(packet) {
    this.source.out(this, packet);
  }

  out(data) {
    this.channel.out(data);
  }

  close() {
    this.source.close(this);
  }
}

const Close = Symbol();

export {
  Close
}

export default Equipment;
