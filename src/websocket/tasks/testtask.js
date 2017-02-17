import {Task} from '../../angler';

class TestTask extends Task {
  constructor(id, callback) {
    super({
      span: 3,
      retryCount: 3,
      callback
    });
    this.id = id;
  }

  first() {
    return {
      event: 'user.read',
      data: {
        id: this.id,
        step: this.step
      }
    };
  }

  arrive(packet) {
    if (packet.event != 'user.data') {
      return;
    }
    this.result.push(packet);
    if (this.step >= 2) {
      return this.complete();
    }
    return this.next({
      event: 'user.read',
      data: {
        id: this.id,
        step: this.step
      }
    })
  }
}

export default TestTask;
