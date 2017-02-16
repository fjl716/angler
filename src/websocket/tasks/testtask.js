import Task from '../../angler/task';

class TestTask extends Task {
  constructor(callback) {
    super({
      span: 3,
      retryCount: 3,
      callback
    });
  }

  first() {
    return {
      event: 'user.read',
      data: this.step
    }
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
      data: this.step
    })
  }
}

export default TestTask;

