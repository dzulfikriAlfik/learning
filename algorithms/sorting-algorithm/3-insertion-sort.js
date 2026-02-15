// ============================================
// Insertion Sort Algorithm
// ============================================
// Time Complexity:
//   - Best Case    : O(n)   → sudah terurut
//   - Average Case : O(n²)
//   - Worst Case   : O(n²)
// Space Complexity : O(1) → in-place
// Stable           : Ya
// ============================================
// Cara kerja:
// Ambil satu elemen dari bagian yang belum terurut.
// Sisipkan elemen tersebut ke posisi yang tepat di bagian
// yang sudah terurut, dengan menggeser elemen-elemen
// yang lebih besar ke kanan.
// Mirip seperti cara kita mengurutkan kartu di tangan.
// ============================================

function insertionSort(arr) {
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    // Geser elemen yang lebih besar dari key ke kanan
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }

    // Sisipkan key di posisi yang tepat
    arr[j + 1] = key;
  }

  return arr;
}

// ============================================
// Visualisasi Step-by-Step
// ============================================

function insertionSortVisualized(arr) {
  const n = arr.length;

  console.log("Array awal:", [...arr]);
  console.log("─".repeat(50));

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    console.log(`\nIterasi ${i}: Ambil key = ${key}`);
    console.log(`  Sebelum: [${arr}]`);

    while (j >= 0 && arr[j] > key) {
      console.log(`  Geser ${arr[j]} ke kanan (index ${j} → ${j + 1})`);
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = key;
    console.log(`  Sisipkan ${key} di index ${j + 1}`);
    console.log(`  Sesudah: [${arr}]`);
    console.log(`  Terurut: [${arr.slice(0, i + 1)}] | Belum: [${arr.slice(i + 1)}]`);
  }

  console.log("\n" + "─".repeat(50));
  console.log("Hasil akhir:", arr);
  return arr;
}

// ============================================
// Demo
// ============================================

console.log("=== INSERTION SORT ===\n");

// Test basic
const arr1 = [12, 11, 13, 5, 6];
console.log("Sebelum:", [...arr1]);
console.log("Sesudah:", insertionSort([...arr1]));

// Test visualisasi
console.log("\n=== Visualisasi ===\n");
insertionSortVisualized([7, 3, 5, 1, 9, 2]);

// Test edge cases
console.log("\n=== Edge Cases ===");
console.log("Sudah terurut:", insertionSort([1, 2, 3, 4, 5]));
console.log("Terbalik:", insertionSort([5, 4, 3, 2, 1]));
console.log("Satu elemen:", insertionSort([42]));
console.log("Kosong:", insertionSort([]));
console.log("Duplikat:", insertionSort([3, 1, 3, 2, 1]));
