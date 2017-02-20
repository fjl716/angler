import Task from '../../../angler/task';

class TaskTick extends Task{
  constructor(id, callback) {
    super({
      space: 3,
      callback
    });
    this.id = id;
  }

  packet(){
    if (this.step >= 3) {
      return;
    }
    this.next();
    return {
      event: 'tick.packet',
      data: {
        id: this.id,
        step: this.step
      }
    };
  }

  arrive(packet){
    if (packet.event != 'task.data') {
      return;
    }
    this.result.push(packet.data.data);
  }
}

export default TaskTick;