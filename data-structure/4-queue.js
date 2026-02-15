class Queue {
  constructor() {
    this._data = [];
    this._head = 0;
  }

  enqueue(value) {
    this._data.push(value);
  }

  dequeue() {
    if (this.isEmpty()) return undefined;
    const value = this._data[this._head];
    this._head += 1;

    if (this._head > 50 && this._head * 2 >= this._data.length) {
      this._data = this._data.slice(this._head);
      this._head = 0;
    }

    return value;
  }

  peek() {
    if (this.isEmpty()) return undefined;
    return this._data[this._head];
  }

  isEmpty() {
    return this._data.length === this._head;
  }

  size() {
    return this._data.length - this._head;
  }
}

module.exports = { Queue };

if (require.main === module) {
  const queue = new Queue();
  queue.enqueue("a");
  queue.enqueue("b");
  queue.enqueue("c");
  console.log("peek:", queue.peek());
  console.log("dequeue:", queue.dequeue());
  console.log("size:", queue.size());
  console.log("dequeue:", queue.dequeue());
  console.log("dequeue:", queue.dequeue());
  console.log("empty:", queue.isEmpty());
}
