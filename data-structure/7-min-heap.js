class MinHeap {
  constructor() {
    this._data = [];
  }

  size() {
    return this._data.length;
  }

  peek() {
    return this._data.length === 0 ? undefined : this._data[0];
  }

  push(value) {
    this._data.push(value);
    this._bubbleUp(this._data.length - 1);
  }

  pop() {
    if (this._data.length === 0) return undefined;
    if (this._data.length === 1) return this._data.pop();

    const value = this._data[0];
    this._data[0] = this._data.pop();
    this._bubbleDown(0);
    return value;
  }

  _bubbleUp(index) {
    let current = index;
    while (current > 0) {
      const parent = Math.floor((current - 1) / 2);
      if (this._data[parent] <= this._data[current]) break;
      [this._data[parent], this._data[current]] = [this._data[current], this._data[parent]];
      current = parent;
    }
  }

  _bubbleDown(index) {
    let current = index;
    while (true) {
      const left = current * 2 + 1;
      const right = current * 2 + 2;
      let smallest = current;

      if (left < this._data.length && this._data[left] < this._data[smallest]) {
        smallest = left;
      }
      if (right < this._data.length && this._data[right] < this._data[smallest]) {
        smallest = right;
      }
      if (smallest === current) break;

      [this._data[current], this._data[smallest]] = [this._data[smallest], this._data[current]];
      current = smallest;
    }
  }
}

module.exports = { MinHeap };

if (require.main === module) {
  const heap = new MinHeap();
  [5, 3, 8, 1].forEach((value) => heap.push(value));
  console.log("peek:", heap.peek());
  console.log("pop:", heap.pop());
  console.log("pop:", heap.pop());
  console.log("size:", heap.size());
  console.log("pop:", heap.pop());
  console.log("pop:", heap.pop());
  console.log("empty peek:", heap.peek());
}
