
class Drive{
  constructor(address) {
    this.channel = null;
    this.queue = new Queue();
    this.current = null;
    this.address = address;
  }

}

export default Drive;