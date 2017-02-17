import {Task} from '../../angler';

class TestTask extends Task {
  constructor(id, callback) {
    super({
      span: 3,
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
      event: 'user.read',
      data: {
        id: this.id,
        step: this.step
      }
    };
  }

  arrive(packet){
    if (packet.event != 'user.data') {
      return;
    }
    this.result.push(packet);
    this.next();
  }
}

export default TestTask
