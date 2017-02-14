class Channel {
  constructor(protocol) {
    this.drive = null;
    this.protocol = protocol;
  }

  send(pack) {
    console.log(pack);
  }

  arrive(pack) {
    if (this.drive) {
      this.drive.arrive(pack);
    }
  }
}
export default Channel;
