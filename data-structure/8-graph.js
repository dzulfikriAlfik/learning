class Graph {
  constructor() {
    this._adj = new Map();
  }

  addVertex(vertex) {
    if (!this._adj.has(vertex)) {
      this._adj.set(vertex, new Set());
    }
  }

  addEdge(a, b, bidirectional = true) {
    this.addVertex(a);
    this.addVertex(b);
    this._adj.get(a).add(b);
    if (bidirectional) {
      this._adj.get(b).add(a);
    }
  }

  neighbors(vertex) {
    return this._adj.has(vertex) ? Array.from(this._adj.get(vertex)) : [];
  }

  bfs(start) {
    if (!this._adj.has(start)) return [];
    const visited = new Set([start]);
    const queue = [start];
    const order = [];

    while (queue.length > 0) {
      const node = queue.shift();
      order.push(node);
      for (const next of this._adj.get(node)) {
        if (!visited.has(next)) {
          visited.add(next);
          queue.push(next);
        }
      }
    }

    return order;
  }

  dfs(start) {
    if (!this._adj.has(start)) return [];
    const visited = new Set();
    const order = [];

    const walk = (node) => {
      visited.add(node);
      order.push(node);
      for (const next of this._adj.get(node)) {
        if (!visited.has(next)) walk(next);
      }
    };

    walk(start);
    return order;
  }
}

module.exports = { Graph };

if (require.main === module) {
  const graph = new Graph();
  graph.addEdge("A", "B");
  graph.addEdge("A", "C");
  graph.addEdge("B", "D");
  graph.addEdge("C", "E");
  console.log("neighbors A:", graph.neighbors("A"));
  console.log("bfs:", graph.bfs("A"));
  console.log("dfs:", graph.dfs("A"));
}
