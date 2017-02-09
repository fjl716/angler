export default class {
  constructor(name, items, count) {
    this.name = name;
    this.items = items;
    this.count = count;
  }

  parse(buffer, index, result) {
    if (this.items.length == 1) {
      const count = result.get(this.count);
      result[this.name]=[];
      for (let i = 0; i < count; i++) {
        let item = result.arr();
        for (let j = 0; j < this.items.length; j++) {
          index = this.items[j].parse(buffer, index, item);
          if (index < 0)
            return index;
        }
        result[this.name].push(item[this.name]);
      }
    } else {

    }
    return index;
  }
}
