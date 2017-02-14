class Channel {
  constructor() {

  }

  send(pack) {
    console.log(pack);
  }

  arrive(pack) {
    if (this.drive){
      this.drive.arrive(pack);
    }
  }
}
export default Channel;