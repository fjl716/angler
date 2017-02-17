export default class {

  constructor({span, retryCount, callback}) {
    this.span = span;
    this.retryCount = retryCount;
    this.callback = callback;
    this.result = [];
    this.step = 0;
    this.retry = 0;
    this.__TIME_LABEL = `${Math.random()}`.substr(2);
  }

  next() {
    this.step++;
    this.__TIME_LABEL = `${Math.random()}`.substr(2);
  }

  complete() {
    this.next();
    this.callback(this.result);
    this.equipment.run();
  }

  packet() {

  }

  arrive(packet) {

  }

  timeout() {
    if (this.retryCount) {
      console.log(`retryCount = ${this.retryCount} \t retry = ${this.retry}`);
      if (this.retry >= this.retryCount) {
        this.complete();
        return;
      }
      this.equipment.sendTaskPacket(this.last);
      this.retry++;
    }
  }
}
