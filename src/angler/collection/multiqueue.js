class MultiQueue {
  constructor() {
    this.items = [[], [], []];
    this.index = 0;
  }

  enqueue(item, space) {
    while (space > this.items.length + this.index) {
      this.items.push([]);
    }
    this.items[space + this.index - 1].push(item);
  }

  dequeue() {
    let result = this.items[this.index];
    this.items[this.index] = [];
    this.index = (this.index + 1) % this.items.length;
    return result;
  }
}
export default MultiQueue;