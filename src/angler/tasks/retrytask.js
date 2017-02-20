import Task from '../task'

class RetryTask extends Task{
  constructor(params){
    super(params)
    this.retryCount = params.retryCount;
  }

  timeout() {
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