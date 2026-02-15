class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    const node = new ListNode(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length += 1;
  }

  prepend(value) {
    const node = new ListNode(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.length += 1;
  }

  find(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) return current;
      current = current.next;
    }
    return null;
  }

  delete(value) {
    if (!this.head) return false;

    let deleted = false;
    while (this.head && this.head.value === value) {
      this.head = this.head.next;
      this.length -= 1;
      deleted = true;
    }

    let current = this.head;
    while (current && current.next) {
      if (current.next.value === value) {
        current.next = current.next.next;
        this.length -= 1;
        deleted = true;
      } else {
        current = current.next;
      }
    }

    if (this.tail && this.tail.value === value) {
      this.tail = current;
    }

    return deleted;
  }

  toArray() {
    const out = [];
    let current = this.head;
    while (current) {
      out.push(current.value);
      current = current.next;
    }
    return out;
  }
}

module.exports = { LinkedList, ListNode };

if (require.main === module) {
  const list = new LinkedList();
  list.append(10);
  list.append(20);
  list.prepend(5);
  console.log("list:", list.toArray());
  console.log("find 20:", list.find(20)?.value ?? null);
  console.log("find 99:", list.find(99));
  list.delete(10);
  console.log("after delete:", list.toArray());
  list.delete(5);
  console.log("after delete head:", list.toArray());
  console.log("length:", list.length);
}
