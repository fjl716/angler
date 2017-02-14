export default class {
  constructor(name) {
    this.name = name;
  }

  parse(buffer, index, pack) {
    if (buffer.length < index + 1)
      return -1;
    pack[this.name] = buffer[index++];
    return index;
  }
}