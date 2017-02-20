import Task from '../task'

class RetryTask extends Task{
  constructor(params){
    super(params)
    this.__TIME_LABEL1 = `${Math.random()}`.substr(2);
    this.__TIME_LABEL2 = this.__TIME_LABEL1;
    this.retryCount = params.retryCount;
    this.retry = 0;
  }

  next() {
    this.step++;
    this.__TIME_LABEL1 = `${Math.random()}`.substr(2);
    this.__TIME_LABEL2 = this.__TIME_LABEL1;
  }

  timeout() {
    if (this.__TIME_LABEL1 != this.__TIME_LABEL2)
      return;
    if (this.retryCount) {
      if (this.retry >= this.retryCount) {
        this.complete();
        return;
      }
      this.equipment.sendTaskPacket(this.last);
      this.retry++;
    }
  }
}

export default RetryTask;