class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const node = new TreeNode(value);
    if (!this.root) {
      this.root = node;
      return;
    }

    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = node;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = node;
          return;
        }
        current = current.right;
      }
    }
  }

  contains(value) {
    let current = this.root;
    while (current) {
      if (current.value === value) return true;
      current = value < current.value ? current.left : current.right;
    }
    return false;
  }

  inOrderTraversal(callback) {
    function walk(node) {
      if (!node) return;
      walk(node.left);
      callback(node.value);
      walk(node.right);
    }
    walk(this.root);
  }
}

module.exports = { BinarySearchTree, TreeNode };

if (require.main === module) {
  const bst = new BinarySearchTree();
  [8, 3, 10, 1, 6, 14].forEach((value) => bst.insert(value));
  const ordered = [];
  bst.inOrderTraversal((value) => ordered.push(value));
  console.log("in-order:", ordered);
  console.log("contains 6:", bst.contains(6));
  console.log("contains 99:", bst.contains(99));
}
