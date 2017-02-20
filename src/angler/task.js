export default class {

  constructor({space, callback}) {
    this.space = space;
    this.callback = callback;
    this.result = [];
    this.step = 0;
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
    const data = this.packet();
    if (!data) {
      this.complete();
      return;
    }
    const packet = data.packet ? data : {packet: data, space: this.space};
    this.equipment.sendTaskPacket(packet);
  }
}
