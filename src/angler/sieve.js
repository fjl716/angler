export default class Sieve {
  constructor(list, callback) {
    this.list = {};
    for (let name in list) {
      this.list[name] = {
        complete: false,
        func: list[name]
      }
    }
    this.results = {};
    this.callback = callback;
  }

  arrive(data) {
    const item = this.list[data.type];
    if (item) {
      item.complete = item.func(this.results, data);
      if (item.complete) {
        for (let name in this.list) {
          if (!this.list[name].complete) return false;
        }
        this.callback(this.results);
        return true;
      }
    }
  }
}
