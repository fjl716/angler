export default class {

  constructor({span,retryCount}) {
    this.span = span;
    this.retryCount = retryCount;
    this.result = [];
    this.step = 1;
    this.retry = 0;
    this.__TIME_LABEL = `${Math.random()}`.substr(2);
  }

  first() {

  }

  arrive(packet) {

  }

  timeout() {
    if (this.retryCount) {
      if (this.retry > this.retryCount) {
        this.complete();
        return;
      }
      console.log(this.last);
      this.equipment.taskSend(this, this.last);
      this.retry++;
      return this.last;
    }
  }

  complete() {
    this.callback(this.result);
    this.next();
    if (this.equipment)
      this.equipment.run();
  }

  next(obj) {
    this.step++;
    this.__TIME_LABEL = `${Math.random()}`.substr(2);
    return obj;
  }
}
