class MultiQueue {
  constructor() {
    this.items = [[]];
    this.index = 0;
  }

  enqueue(item, space) {
    if (space > this.items.length - 1) {

      let nItems = [];
      let i = 0;
      for (; i < this.items.length; i++) {
        nItems.push(this.items[(this.index + i) % this.items.length]);
      }
      for (; i < space + 1; i++) {
        nItems.push([]);
      }
      this.items = nItems;
      this.index = 0;
    }
    this.items[(space + this.index - 1) % this.items.length].push(item);
  }

  dequeue() {
    let result = this.items[this.index];
    this.items[this.index] = [];
    this.index = (this.index + 1) % this.items.length;
    return result;
  }
}
export default MultiQueue;
