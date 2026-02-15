// ============================================
// Quick Sort Algorithm
// ============================================
// Time Complexity:
//   - Best Case    : O(n log n)
//   - Average Case : O(n log n)
//   - Worst Case   : O(n²) → pivot selalu min/max
// Space Complexity : O(log n) → recursive call stack
// Stable           : Tidak
// ============================================
// Cara kerja (Divide and Conquer):
// 1. Pilih satu elemen sebagai PIVOT.
// 2. PARTITION: Susun ulang array sehingga elemen < pivot
//    di kiri, elemen > pivot di kanan.
// 3. Rekursif sort bagian kiri dan kanan pivot.
// ============================================

// --- Versi 1: Simple (membuat array baru) ---

function quickSortSimple(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1]; // pivot = elemen terakhir
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSortSimple(left), pivot, ...quickSortSimple(right)];
}

// --- Versi 2: In-Place (Lomuto Partition Scheme) ---

function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high]; // pivot = elemen terakhir
  let i = low - 1; // index elemen terkecil

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // Tempatkan pivot di posisi yang benar
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

// --- Versi 3: In-Place (Hoare Partition Scheme) ---

function quickSortHoare(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = hoarePartition(arr, low, high);
    quickSortHoare(arr, low, pivotIndex);
    quickSortHoare(arr, pivotIndex + 1, high);
  }
  return arr;
}

function hoarePartition(arr, low, high) {
  const pivot = arr[Math.floor((low + high) / 2)];
  let i = low - 1;
  let j = high + 1;

  while (true) {
    do {
      i++;
    } while (arr[i] < pivot);

    do {
      j--;
    } while (arr[j] > pivot);

    if (i >= j) return j;

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// ============================================
// Visualisasi Step-by-Step
// ============================================

function quickSortVisualized(arr, low = 0, high = arr.length - 1, depth = 0) {
  const indent = "  ".repeat(depth);

  if (low < high) {
    console.log(`${indent}📌 QuickSort([${arr.slice(low, high + 1)}]) pivot=${arr[high]}`);

    const pivotIndex = partitionVisualized(arr, low, high, indent);

    console.log(`${indent}✅ Pivot ${arr[pivotIndex]} di posisi ${pivotIndex}: [${arr}]`);
    console.log(`${indent}   Kiri: [${arr.slice(low, pivotIndex)}] | Kanan: [${arr.slice(pivotIndex + 1, high + 1)}]`);

    quickSortVisualized(arr, low, pivotIndex - 1, depth + 1);
    quickSortVisualized(arr, pivotIndex + 1, high, depth + 1);
  }

  return arr;
}

function partitionVisualized(arr, low, high, indent) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      if (i !== j) {
        console.log(`${indent}  Tukar ${arr[i]} ↔ ${arr[j]}`);
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

// ============================================
// Demo
// ============================================

console.log("=== QUICK SORT ===\n");

// Test simple version
const arr1 = [10, 7, 8, 9, 1, 5];
console.log("Simple version:");
console.log("Sebelum:", [...arr1]);
console.log("Sesudah:", quickSortSimple([...arr1]));

// Test in-place Lomuto
const arr2 = [10, 7, 8, 9, 1, 5];
console.log("\nIn-Place (Lomuto):");
console.log("Sebelum:", [...arr2]);
console.log("Sesudah:", quickSort([...arr2]));

// Test in-place Hoare
const arr3 = [10, 7, 8, 9, 1, 5];
console.log("\nIn-Place (Hoare):");
console.log("Sebelum:", [...arr3]);
console.log("Sesudah:", quickSortHoare([...arr3]));

// Test visualisasi
console.log("\n=== Visualisasi (Lomuto) ===\n");
quickSortVisualized([6, 3, 8, 1, 5, 2]);

// Test edge cases
console.log("\n=== Edge Cases ===");
console.log("Sudah terurut:", quickSort([1, 2, 3, 4, 5]));
console.log("Terbalik:", quickSort([5, 4, 3, 2, 1]));
console.log("Satu elemen:", quickSort([42]));
console.log("Kosong:", quickSort([]));
console.log("Duplikat:", quickSort([3, 1, 3, 2, 1]));
