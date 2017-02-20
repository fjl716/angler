import Task from '../../angler/task';

class ReadTask extends Task {
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
      space: 1
    }
  }

  arrive(packet) {
    if (this.index >= 3) {
      return this.complete();
    }
    if (packet.key == 'read') {
      this.index++;
      return this.next({
        packet: {
          key: 'read',
          data: '123'
        },
        space: 1
      });
    }
  }

  timeout() {
    console.log(`time out ${this.name}`);
    return this.complete();
  }
}
export default ReadTask;