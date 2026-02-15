// ============================================
// Selection Sort Algorithm
// ============================================
// Time Complexity:
//   - Best Case    : O(n²)
//   - Average Case : O(n²)
//   - Worst Case   : O(n²)
// Space Complexity : O(1) → in-place
// Stable           : Tidak
// ============================================
// Cara kerja:
// Cari elemen terkecil dari sisa array yang belum terurut.
// Tukar elemen terkecil tersebut dengan elemen di posisi
// paling kiri yang belum terurut.
// Ulangi sampai seluruh array terurut.
// ============================================

function selectionSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    // Cari elemen terkecil di sisa array
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // Tukar jika ditemukan elemen lebih kecil
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }

  return arr;
}

// ============================================
// Visualisasi Step-by-Step
// ============================================

function selectionSortVisualized(arr) {
  const n = arr.length;

  console.log("Array awal:", [...arr]);
  console.log("─".repeat(40));

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    console.log(`Iterasi ${i + 1}: Minimum = ${arr[minIndex]} (index ${minIndex})`);

    if (minIndex !== i) {
      console.log(`  Tukar arr[${i}]=${arr[i]} ↔ arr[${minIndex}]=${arr[minIndex]}`);
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    } else {
      console.log(`  Tidak perlu tukar, sudah di posisi benar.`);
    }

    console.log(`  Hasil: [${arr}]`);
    console.log(`         ${"  ".repeat(i)}${"^^".padEnd(2)} terurut`);
  }

  console.log("─".repeat(40));
  console.log("Hasil akhir:", arr);
  return arr;
}

// ============================================
// Demo
// ============================================

console.log("=== SELECTION SORT ===\n");

// Test basic
const arr1 = [64, 25, 12, 22, 11];
console.log("Sebelum:", [...arr1]);
console.log("Sesudah:", selectionSort([...arr1]));

// Test visualisasi
console.log("\n=== Visualisasi ===\n");
selectionSortVisualized([29, 10, 14, 37, 13]);

// Test edge cases
console.log("\n=== Edge Cases ===");
console.log("Sudah terurut:", selectionSort([1, 2, 3, 4, 5]));
console.log("Terbalik:", selectionSort([5, 4, 3, 2, 1]));
console.log("Satu elemen:", selectionSort([42]));
console.log("Kosong:", selectionSort([]));
console.log("Duplikat:", selectionSort([3, 1, 3, 2, 1]));
