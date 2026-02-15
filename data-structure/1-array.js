class DynamicArray {
  constructor() {
    this._data = [];
  }

  get length() {
    return this._data.length;
  }

  get(index) {
    if (index < 0 || index >= this._data.length) {
      throw new RangeError("Index out of bounds");
    }
    return this._data[index];
  }

  set(index, value) {
    if (index < 0 || index >= this._data.length) {
      throw new RangeError("Index out of bounds");
    }
    this._data[index] = value;
  }

  push(value) {
    this._data.push(value);
  }

  pop() {
    if (this._data.length === 0) return undefined;
    return this._data.pop();
  }

  insert(index, value) {
    if (index < 0 || index > this._data.length) {
      throw new RangeError("Index out of bounds");
    }
    this._data.splice(index, 0, value);
  }

  remove(index) {
    if (index < 0 || index >= this._data.length) {
      throw new RangeError("Index out of bounds");
    }
    return this._data.splice(index, 1)[0];
  }

  toArray() {
    return this._data.slice();
  }
}

module.exports = { DynamicArray };

if (require.main === module) {
  const arr = new DynamicArray();
  arr.push(10);
  arr.push(20);
  arr.insert(1, 15);
  arr.set(2, 25);
  console.log("array:", arr.toArray());
  arr.remove(1);
  console.log("after remove:", arr.toArray());
  console.log("get index 1:", arr.get(1));
  console.log("pop:", arr.pop());
  console.log("length:", arr.length);
}
