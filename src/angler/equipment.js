import {Queue} from './collection';
import watcher from './watcher';

class Equipment {
  constructor(id, source,channel) {
    this.__ID__ = id;
    this.source = source;
    this.queue = new Queue();
    this.channel = channel;
  }

  online({source,channel}){
    this.source = source;
    this.channel = channel;
    if (!this.current) {
      this.run();
    }
  }

  offline(){
    this.channel = null;
  }

  work(task) {
    task.equipment = this;
    this.queue.enqueue(task);
    if (!this.current) {
      this.run();
    }
  }

  run() {
    this.current = null;
    if (this.queue.size() > 0) {
      this.current = this.queue.dequeue();
      this.sendTask();
    }
  }

  taskArrive(packet) {
    const task = this.current;
    if (task) {
      task.arrive(packet);
      this.sendTask();
    }
  }

  sendTask() {
    if (!this.current)
      return;
    const data = this.current.packet();
    if (!data) {
      this.current.complete();
    } else {
      const packet = data.packet ? data.packet : data;
      const span = data.span ? data.span : this.current.span;
      this.current.last = {
        packet,
        span
      };
      this.sendTaskPacket(this.current.last);
    }
  }

  sendTaskPacket({packet,span}){
    this.send(packet);
    if (span) {
      watcher.add(this.current, span);
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
    if (this.channel)
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
