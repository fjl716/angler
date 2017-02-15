class Equipment {
  constructor(id, source) {
    this.__ID__ = id;
    this.source = source;
  }

  send(packet) {
    this.source.out(this, packet);
  }

  arrive(data) {
    this.source.arrive(this, data);
  }

  out(data) {
    this.channel.out(data);
  }

  close() {
    this.source.close(this);
  }
}

const Close = Symbol();

export {
  Close
}

export default Equipment;
