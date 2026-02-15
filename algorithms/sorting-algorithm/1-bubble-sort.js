// ============================================
// Bubble Sort Algorithm
// ============================================
// Time Complexity:
//   - Best Case    : O(n)   → sudah terurut (dengan optimasi)
//   - Average Case : O(n²)
//   - Worst Case   : O(n²)
// Space Complexity : O(1) → in-place
// Stable           : Ya
// ============================================
// Cara kerja:
// Bandingkan elemen berpasangan dari kiri ke kanan.
// Jika elemen kiri lebih besar dari kanan, tukar.
// Ulangi proses sampai tidak ada lagi pertukaran.
// Elemen terbesar akan "menggelembung" (bubble) ke akhir
// array di setiap iterasi.
// ============================================

function bubbleSort(arr) {
  const n = arr.length;
  let swapped;

  for (let i = 0; i < n - 1; i++) {
    swapped = false;

    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // Tukar elemen
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    // Jika tidak ada pertukaran, array sudah terurut
    if (!swapped) break;
  }

  return arr;
}

// ============================================
// Visualisasi Step-by-Step
// ============================================

function bubbleSortVisualized(arr) {
  const n = arr.length;
  let swapped;
  let step = 0;

  console.log("Array awal:", [...arr]);
  console.log("─".repeat(40));

  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    console.log(`\nIterasi ke-${i + 1}:`);

    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        step++;
        console.log(`  Step ${step}: Tukar ${arr[j + 1]} ↔ ${arr[j]} → [${arr}]`);
      }
    }

    if (!swapped) {
      console.log("  Tidak ada pertukaran. Array sudah terurut!");
      break;
    }
  }

  console.log("─".repeat(40));
  console.log("Hasil akhir:", arr);
  return arr;
}

// ============================================
// Demo
// ============================================

console.log("=== BUBBLE SORT ===\n");

// Test basic
const arr1 = [64, 34, 25, 12, 22, 11, 90];
console.log("Sebelum:", [...arr1]);
console.log("Sesudah:", bubbleSort([...arr1]));

// Test visualisasi
console.log("\n=== Visualisasi ===\n");
bubbleSortVisualized([5, 3, 8, 4, 2]);

// Test edge cases
console.log("\n=== Edge Cases ===");
console.log("Sudah terurut:", bubbleSort([1, 2, 3, 4, 5]));
console.log("Terbalik:", bubbleSort([5, 4, 3, 2, 1]));
console.log("Satu elemen:", bubbleSort([42]));
console.log("Kosong:", bubbleSort([]));
console.log("Duplikat:", bubbleSort([3, 1, 3, 2, 1]));
