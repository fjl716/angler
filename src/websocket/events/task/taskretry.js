import {RetryTask} from '../../../angler/tasks';

class TestRetry extends RetryTask {
  constructor(id, callback) {
    super({
      space: 3,
      retryCount: 2,
      callback
    });
    this.id = id;
  }

  packet(){
    if (this.step >= 3) {
      return;
    }
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
    this.next();
    this.equipment.sendTask();
  }
}

export default TestRetry
