import Task from '../task'

class RetryTask extends Task {
  constructor(params) {
    super(params);
    this.retryCount = params.retryCount;
    this.retry = 0;
  }

  timeout(__TIME_LABEL) {
    if (this.__TIME_LABEL != __TIME_LABEL) {
      return;
    }
    if (this.retry >= this.retryCount) {
      this.complete();
      return;
    }
    this.equipment.sendTaskPacket(this.last);
    this.retry++;
  }
}

export default RetryTask;