export default class {
  constructor(name, items, count) {
    this.name = name;
    this.items = items;
    this.count = count;
  }

  parse(buffer, index, result) {
    if (this.items.length == 1) {
      for (let i = 0; i < this.count; i++) {
        for (let j = 0; j < this.items.length; j++) {
          index = this.items[i].parse(buffer, index, result);
          if (index < 0)
            return index;
        }
      }
    } else {

    }
    return index;
  }
}