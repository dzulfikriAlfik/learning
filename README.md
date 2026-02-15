# Learning — Programming Fundamentals

A curated collection of fundamental programming concepts implemented in JavaScript. This repository serves as a hands-on learning resource for data structures, sorting algorithms, and their real-world applications.

## Overview

Whether you're preparing for technical interviews, reinforcing computer science fundamentals, or building a stronger programming foundation, this repository provides clean, well-documented implementations of core concepts. Each module includes working code with clear explanations of time and space complexity.

---

## Contents

### Data Structures

| Module | Description | Key Operations |
|--------|-------------|----------------|
| **Array** | Dynamic array with index-based access | get, set, push, pop, insert, remove |
| **Linked List** | Singly linked list with head and tail | append, prepend, find, delete |
| **Stack** | LIFO (Last-In-First-Out) structure | push, pop, peek, isEmpty |
| **Queue** | FIFO (First-In-First-Out) structure | enqueue, dequeue, peek, isEmpty |
| **Hash Map** | Key-value storage with hash-based lookup | set, get, has, delete |
| **Binary Search Tree** | Sorted tree structure for fast lookups | insert, search, traverse |
| **Min Heap** | Complete binary tree with minimum at root | insert, extractMin, peek |
| **Graph** | Node-edge representation for relationships | addVertex, addEdge, traverse |

### Sorting Algorithms

| Algorithm | Time (Best) | Time (Avg/Worst) | Space | Stable |
|-----------|-------------|------------------|-------|--------|
| Bubble Sort | O(n) | O(n²) | O(1) | Yes |
| Selection Sort | O(n²) | O(n²) | O(1) | No |
| Insertion Sort | O(n) | O(n²) | O(1) | Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n) | Yes |
| Quick Sort | O(n log n) | O(n²) | O(log n) | No |
| Heap Sort | O(n log n) | O(n log n) | O(1) | No |
| Counting Sort | O(n + k) | O(n + k) | O(k) | Yes |
| Radix Sort | O(nk) | O(nk) | O(n + k) | Yes |

### Real-World Applications

- **Playlist with Linked List** — A music playlist implementation using doubly linked list for next/previous navigation and queue-like playback.

---

## Project Structure

```
learning/
├── algorithms/
│   └── sorting-algorithm/
│       ├── 1-bubble-sort.js
│       ├── 2-selection-sort.js
│       ├── 3-insertion-sort.js
│       ├── 4-merge-sort.js
│       ├── 5-quick-sort.js
│       ├── 6-heap-sort.js
│       ├── 7-counting-sort.js
│       └── 8-radix-sort.js
├── data-structure/
│   ├── 1-array.js
│   ├── 2-linked-list.js
│   ├── 3-stack.js
│   ├── 4-queue.js
│   ├── 5-hash-map.js
│   ├── 6-binary-search-tree.js
│   ├── 7-min-heap.js
│   ├── 8-graph.js
│   └── real-case/
│       └── 2-linked-list.js
└── README.md
```

---

## Prerequisites

- **Node.js** (v14 or higher recommended)
- Basic familiarity with JavaScript (ES6+)

---

## Getting Started

### Run a Module

Each file is self-contained and can be executed directly with Node.js:

```bash
# Run a data structure example
node data-structure/1-array.js

# Run a sorting algorithm
node algorithms/sorting-algorithm/4-merge-sort.js

# Run the playlist example
node data-structure/real-case/2-linked-list.js
```

### Suggested Learning Path

1. **Arrays & Linked Lists** — Build intuition for sequential data and pointers
2. **Stack & Queue** — Understand LIFO and FIFO patterns
3. **Hash Map** — Learn fast key-value lookups
4. **Binary Search Tree & Heap** — Explore tree-based structures
5. **Graph** — Model relationships and networks
6. **Sorting Algorithms** — Study comparison-based and non-comparison sorts
7. **Real-World Applications** — See how structures apply in practice

---

## Learning Resources

- Each sorting algorithm file includes comments on time complexity, space complexity, stability, and how the algorithm works
- Use the implementations as reference while building your own from scratch for deeper understanding
- Experiment by modifying the code, adding tests, or implementing variations

---

## License

This project is open source and available for educational use.
