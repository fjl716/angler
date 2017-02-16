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
      this.run();
    }
  }

  work(task) {
    task.equipment = this;
    this.queue.enqueue(task);
    if (!this.current) {
      this.run();
    }
  }

  run() {
    if (this.queue.size() > 0) {
      this.current = this.queue.dequeue();
      this.taskSend(this.current,this.current.first());
    }
  }

  taskArrive(packet) {
    const task = this.current;
    if (task) {
      this.taskSend(this.current,task.arrive(packet));
    }
  }

  taskSend(task,data) {
    this.current.last = null;
    if (data) {
      const packet = data.packet ? data.packet : data;
      const span = data.span ? data.span : task.span;
      this.current.last = {
        packet,
        span
      };
      console.log(packet);
      console.log(span);
      this.send(packet);
      if (span) {
        watcher.add(this.current, span);
      }
    }
  }

  arrive(packet) {
    const packets = this.source.protocol.parse(packet);
    if (packets) {
      packets.map(packet => {
        packet.__ID__ = this.__ID__;
        this.source.arrive({
          equipment: this,
          packet
        });
      })
    }
  }

  send(packet) {
    this.source.send({
      equipment: this,
      packet
    });
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
