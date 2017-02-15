import Task from '../../angler/task'

class TestTask extends Task {
  constructor(obj) {
    super(obj)
  }

  first() {
    this.index = 1;
    return {
      packet: {
        key: 'read',
        data: '123'
      },
      span: 1
    }
  }

  arrive(pack) {
    if (this.index >= 3) {
      return this.complete();
    }
    if (pack.key == 'read') {
      this.index++;
      return this.next({
        packet: {
          key: 'read',
          data: '123'
        },
        span: 1
      });
    }
  }

  timeout() {
    console.log(`time out ${this.name}`);
    return this.complete();
  }
}

export default TestTask;
