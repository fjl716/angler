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
      data: '123'
    }
  }

  arrive(packet) {
    if (packet.event != 'user.data') {
      return;
    }
    this.result.push(packet);
    if (this.step >= 3) {
      return this.complete();
    }
    return this.next({
      event: 'user.read',
      data: '123'
    })
  }
}

export default TestTask;

