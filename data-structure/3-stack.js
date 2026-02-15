class Stack {
  constructor() {
    this._data = [];
  }

  push(value) {
    this._data.push(value);
  }

  pop() {
    if (this._data.length === 0) return undefined;
    return this._data.pop();
  }

  peek() {
    if (this._data.length === 0) return undefined;
    return this._data[this._data.length - 1];
  }

  isEmpty() {
    return this._data.length === 0;
  }

  size() {
    return this._data.length;
  }
}

module.exports = { Stack };

if (require.main === module) {
  const stack = new Stack();
  console.log("empty:", stack.isEmpty());
  stack.push(1);
  stack.push(2);
  stack.push(3);
  console.log("peek:", stack.peek());
  console.log("pop:", stack.pop());
  console.log("size:", stack.size());
  console.log("pop:", stack.pop());
  console.log("pop:", stack.pop());
  console.log("empty:", stack.isEmpty());
}
