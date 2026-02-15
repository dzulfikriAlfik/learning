class HashMap {
  constructor(size = 32) {
    this._buckets = Array.from({ length: size }, () => []);
    this._size = 0;
  }

  _hash(key) {
    const str = String(key);
    let hash = 0;
    for (let i = 0; i < str.length; i += 1) {
      hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
    }
    return hash % this._buckets.length;
  }

  _resizeIfNeeded() {
    const load = this._size / this._buckets.length;
    if (load < 0.75) return;

    const oldBuckets = this._buckets;
    this._buckets = Array.from({ length: oldBuckets.length * 2 }, () => []);
    this._size = 0;

    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }

  set(key, value) {
    const index = this._hash(key);
    const bucket = this._buckets[index];

    for (let i = 0; i < bucket.length; i += 1) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }

    bucket.push([key, value]);
    this._size += 1;
    this._resizeIfNeeded();
  }

  get(key) {
    const index = this._hash(key);
    const bucket = this._buckets[index];

    for (let i = 0; i < bucket.length; i += 1) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }

    return undefined;
  }

  has(key) {
    return this.get(key) !== undefined;
  }

  delete(key) {
    const index = this._hash(key);
    const bucket = this._buckets[index];

    for (let i = 0; i < bucket.length; i += 1) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this._size -= 1;
        return true;
      }
    }

    return false;
  }

  size() {
    return this._size;
  }
}

module.exports = { HashMap };

if (require.main === module) {
  const map = new HashMap();
  map.set("name", "Ari");
  map.set("age", 21);
  map.set("age", 22);
  console.log("name:", map.get("name"));
  console.log("has age:", map.has("age"));
  console.log("has city:", map.has("city"));
  map.delete("age");
  console.log("size:", map.size());
}
