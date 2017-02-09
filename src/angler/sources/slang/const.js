export default class {
  constructor(data) {
    this.data = new Array(data.length / 2);
    for (let i = 0; i < this.data.length; i++) {
      this.data[i / 2] = parseInt(data.substring(i * 2, (i * 2) + 2), 16);
    }
  }

  parse(buffer, index, pack) {
    if (buffer.length < index + this.data.length)
      return -1;
    let i = 0;
    for (; i < this.data.length; i++) {
      if (this.data[i] != buffer[index++]) {
        return -2
      }
    }
    return index;
  }
}
