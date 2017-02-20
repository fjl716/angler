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
      event: 'retry.start',
      data: {
        id: this.id,
        step: this.step
      }
    };
  }

  arrive(packet){
    if (packet.event != 'retry.start') {
      return;
    }
    this.result.push(packet);
    this.next();
  }
}

export default TestRetry
