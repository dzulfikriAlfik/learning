// ============================================
// Heap Sort Algorithm
// ============================================
// Time Complexity:
//   - Best Case    : O(n log n)
//   - Average Case : O(n log n)
//   - Worst Case   : O(n log n)
// Space Complexity : O(1) → in-place
// Stable           : Tidak
// ============================================
// Cara kerja:
// 1. Bangun Max Heap dari array.
//    (Max Heap: parent selalu >= children)
// 2. Tukar root (elemen terbesar) dengan elemen terakhir.
// 3. Kurangi ukuran heap, lalu heapify root.
// 4. Ulangi sampai heap kosong.
// ============================================

function heapSort(arr) {
  const n = arr.length;

  // Step 1: Bangun Max Heap (dari bawah ke atas)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // Step 2: Ekstrak elemen satu-satu dari heap
  for (let i = n - 1; i > 0; i--) {
    // Tukar root (max) dengan elemen terakhir
    [arr[0], arr[i]] = [arr[i], arr[0]];

    // Heapify root dengan ukuran heap yang berkurang
    heapify(arr, i, 0);
  }

  return arr;
}

function heapify(arr, heapSize, rootIndex) {
  let largest = rootIndex;
  const left = 2 * rootIndex + 1;
  const right = 2 * rootIndex + 2;

  // Cek apakah child kiri lebih besar dari root
  if (left < heapSize && arr[left] > arr[largest]) {
    largest = left;
  }

  // Cek apakah child kanan lebih besar dari largest
  if (right < heapSize && arr[right] > arr[largest]) {
    largest = right;
  }

  // Jika largest bukan root, tukar dan heapify subtree
  if (largest !== rootIndex) {
    [arr[rootIndex], arr[largest]] = [arr[largest], arr[rootIndex]];
    heapify(arr, heapSize, largest);
  }
}

// ============================================
// Visualisasi Step-by-Step
// ============================================

function heapSortVisualized(arr) {
  const n = arr.length;

  console.log("Array awal:", [...arr]);
  console.log("\n--- Build Max Heap ---");

  // Build Max Heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    console.log(`Heapify index ${i} (value=${arr[i]}):`);
    heapifyVisualized(arr, n, i);
    console.log(`  → [${arr}]`);
  }

  console.log(`\nMax Heap: [${arr}]`);
  printHeapTree(arr, arr.length);

  console.log("\n--- Extract & Sort ---");

  // Extract
  for (let i = n - 1; i > 0; i--) {
    console.log(`\nTukar root(${arr[0]}) ↔ arr[${i}](${arr[i]})`);
    [arr[0], arr[i]] = [arr[i], arr[0]];
    console.log(`  Heap: [${arr.slice(0, i)}] | Sorted: [${arr.slice(i)}]`);
    heapifyVisualized(arr, i, 0);
  }

  console.log("\n─".repeat(40));
  console.log("Hasil akhir:", arr);
  return arr;
}

function heapifyVisualized(arr, heapSize, rootIndex) {
  let largest = rootIndex;
  const left = 2 * rootIndex + 1;
  const right = 2 * rootIndex + 2;

  if (left < heapSize && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < heapSize && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== rootIndex) {
    console.log(`  Tukar arr[${rootIndex}]=${arr[rootIndex]} ↔ arr[${largest}]=${arr[largest]}`);
    [arr[rootIndex], arr[largest]] = [arr[largest], arr[rootIndex]];
    heapifyVisualized(arr, heapSize, largest);
  }
}

// Tampilkan heap sebagai pohon
function printHeapTree(arr, size) {
  if (size === 0) return;

  const levels = Math.ceil(Math.log2(size + 1));
  let index = 0;

  console.log("\n  Heap Tree:");
  for (let level = 0; level < levels; level++) {
    const nodesInLevel = Math.pow(2, level);
    const spacing = " ".repeat(Math.pow(2, levels - level) - 1);
    const between = " ".repeat(Math.pow(2, levels - level + 1) - 1);
    let line = spacing;

    for (let i = 0; i < nodesInLevel && index < size; i++) {
      line += String(arr[index]).padStart(2) + between;
      index++;
    }

    console.log(line);
  }
}

// ============================================
// Demo
// ============================================

console.log("=== HEAP SORT ===\n");

// Test basic
const arr1 = [12, 11, 13, 5, 6, 7];
console.log("Sebelum:", [...arr1]);
console.log("Sesudah:", heapSort([...arr1]));

// Test visualisasi
console.log("\n=== Visualisasi ===\n");
heapSortVisualized([4, 10, 3, 5, 1, 8]);

// Test edge cases
console.log("\n=== Edge Cases ===");
console.log("Sudah terurut:", heapSort([1, 2, 3, 4, 5]));
console.log("Terbalik:", heapSort([5, 4, 3, 2, 1]));
console.log("Satu elemen:", heapSort([42]));
console.log("Kosong:", heapSort([]));
console.log("Duplikat:", heapSort([3, 1, 3, 2, 1]));
