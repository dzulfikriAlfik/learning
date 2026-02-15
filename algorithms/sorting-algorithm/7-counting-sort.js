// ============================================
// Counting Sort Algorithm
// ============================================
// Time Complexity:
//   - Best Case    : O(n + k)
//   - Average Case : O(n + k)
//   - Worst Case   : O(n + k)
//   dimana k = range nilai (max - min + 1)
// Space Complexity : O(n + k)
// Stable           : Ya
// ============================================
// Cara kerja:
// 1. Hitung frekuensi kemunculan setiap elemen.
// 2. Hitung prefix sum (cumulative count)
//    untuk menentukan posisi setiap elemen di output.
// 3. Bangun array output berdasarkan prefix sum.
//
// Catatan: Cocok untuk data integer dengan range kecil.
// ============================================

function countingSort(arr) {
  if (arr.length <= 1) return arr;

  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const range = max - min + 1;

  // Step 1: Hitung frekuensi
  const count = new Array(range).fill(0);
  for (const num of arr) {
    count[num - min]++;
  }

  // Step 2: Prefix sum (cumulative count)
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }

  // Step 3: Bangun output (traverse dari belakang untuk stable)
  const output = new Array(arr.length);
  for (let i = arr.length - 1; i >= 0; i--) {
    const pos = count[arr[i] - min] - 1;
    output[pos] = arr[i];
    count[arr[i] - min]--;
  }

  return output;
}

// ============================================
// Versi Sederhana (langsung rebuild dari count)
// ============================================

function countingSortSimple(arr) {
  if (arr.length <= 1) return arr;

  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const range = max - min + 1;

  // Hitung frekuensi
  const count = new Array(range).fill(0);
  for (const num of arr) {
    count[num - min]++;
  }

  // Rebuild array dari count
  const result = [];
  for (let i = 0; i < range; i++) {
    for (let j = 0; j < count[i]; j++) {
      result.push(i + min);
    }
  }

  return result;
}

// ============================================
// Visualisasi Step-by-Step
// ============================================

function countingSortVisualized(arr) {
  if (arr.length <= 1) return arr;

  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const range = max - min + 1;

  console.log("Array awal:", [...arr]);
  console.log(`Range: ${min} sampai ${max} (${range} nilai)`);
  console.log("─".repeat(50));

  // Step 1: Hitung frekuensi
  const count = new Array(range).fill(0);
  for (const num of arr) {
    count[num - min]++;
  }

  console.log("\n📊 Step 1 - Hitung Frekuensi:");
  console.log("  Nilai : ", Array.from({ length: range }, (_, i) => String(i + min).padStart(3)).join(""));
  console.log("  Count : ", count.map((c) => String(c).padStart(3)).join(""));

  // Step 2: Prefix sum
  const prefixSum = [...count];
  for (let i = 1; i < range; i++) {
    prefixSum[i] += prefixSum[i - 1];
  }

  console.log("\n📊 Step 2 - Prefix Sum (Cumulative Count):");
  console.log("  Nilai : ", Array.from({ length: range }, (_, i) => String(i + min).padStart(3)).join(""));
  console.log("  CumSum: ", prefixSum.map((c) => String(c).padStart(3)).join(""));

  // Step 3: Build output
  const output = new Array(arr.length);
  console.log("\n📊 Step 3 - Build Output Array:");

  for (let i = arr.length - 1; i >= 0; i--) {
    const pos = prefixSum[arr[i] - min] - 1;
    output[pos] = arr[i];
    prefixSum[arr[i] - min]--;
    console.log(`  arr[${i}]=${arr[i]} → output[${pos}] | output: [${output.map((v) => (v !== undefined ? v : "_")).join(", ")}]`);
  }

  console.log("\n" + "─".repeat(50));
  console.log("Hasil akhir:", output);
  return output;
}

// ============================================
// Demo
// ============================================

console.log("=== COUNTING SORT ===\n");

// Test basic
const arr1 = [4, 2, 2, 8, 3, 3, 1];
console.log("Sebelum:", [...arr1]);
console.log("Sesudah:", countingSort([...arr1]));

// Test versi sederhana
console.log("\nVersi Sederhana:", countingSortSimple([4, 2, 2, 8, 3, 3, 1]));

// Test visualisasi
console.log("\n=== Visualisasi ===\n");
countingSortVisualized([4, 2, 7, 1, 3, 2, 5]);

// Test dengan angka negatif
console.log("\n=== Angka Negatif ===");
console.log("Negatif:", countingSort([-3, -1, 0, 2, -2, 1]));

// Test edge cases
console.log("\n=== Edge Cases ===");
console.log("Sudah terurut:", countingSort([1, 2, 3, 4, 5]));
console.log("Terbalik:", countingSort([5, 4, 3, 2, 1]));
console.log("Satu elemen:", countingSort([42]));
console.log("Kosong:", countingSort([]));
console.log("Semua sama:", countingSort([7, 7, 7, 7]));
