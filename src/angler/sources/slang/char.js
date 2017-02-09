export default class {
  constructor(name, count) {
    this.name = name;
    this.count = count;
  }

  parse(buffer, index, pack) {
    if (buffer.length < index + this.count)
      return -1;
    let value = '';
    for (let i = 0; i < this.count; i++) {
      value += buffer[index++].toString(16);
    }
    pack[this.name] = value;
    return index;
  }
}
