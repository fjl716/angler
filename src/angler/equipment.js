class Equipment {
  constructor(id,source) {
    this.__ID__ = id;
    this.source = source;
  }

  send(packet) {
    this.source.out(this, packet);
  }

}

const Close = Symbol();

export {
  Close
}

export default Equipment;
