export default class {

  constructor(obj) {
    Object.assign(this,obj);
    this.__TIME_LABEL = `${Math.random()}`.substr(2);
  }

  first(){

  }

  arrive(){

  }

  timeout(){

  }

  complete(obj) {
    this.next();
    if (this.drive)
      this.drive.start();
    return obj;
  }

  next(obj) {
    this.__TIME_LABEL = `${Math.random()}`.substr(2);
    return obj;
  }
}
