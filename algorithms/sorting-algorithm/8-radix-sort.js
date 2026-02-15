// ============================================
// Radix Sort Algorithm
// ============================================
// Time Complexity:
//   - Best Case    : O(n × d)
//   - Average Case : O(n × d)
//   - Worst Case   : O(n × d)
//   dimana d = jumlah digit dari angka terbesar
// Space Complexity : O(n + k), k = basis (10 untuk desimal)
// Stable           : Ya
// ============================================
// Cara kerja:
// Sort digit per digit, mulai dari digit paling kecil
// (Least Significant Digit / LSD) ke digit paling besar.
// Setiap digit disort menggunakan Counting Sort (stable).
//
// Contoh: [170, 45, 75, 90, 802, 24, 2, 66]
//   Sort satuan  → [170, 90, 802, 2, 24, 45, 75, 66]
//   Sort puluhan → [802, 2, 24, 45, 66, 170, 75, 90]
//   Sort ratusan → [2, 24, 45, 66, 75, 90, 170, 802]
// ============================================

function radixSort(arr) {
  if (arr.length <= 1) return arr;

  // Pisahkan angka negatif dan positif
  const negatives = arr.filter((n) => n < 0).map((n) => -n);
  const positives = arr.filter((n) => n >= 0);

  // Sort positif
  const sortedPositives = positives.length > 0 ? radixSortPositive(positives) : [];

  // Sort negatif (balik, sort, balik lagi, & reverse)
  const sortedNegatives =
    negatives.length > 0 ? radixSortPositive(negatives).reverse().map((n) => -n) : [];

  return [...sortedNegatives, ...sortedPositives];
}

function radixSortPositive(arr) {
  if (arr.length <= 1) return arr;

  const max = Math.max(...arr);
  let result = [...arr];

  // Sort berdasarkan setiap digit
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    result = countingSortByDigit(result, exp);
  }

  return result;
}

function countingSortByDigit(arr, exp) {
  const n = arr.length;
  const output = new Array(n);
  const count = new Array(10).fill(0); // 0-9 digit

  // Hitung frekuensi digit pada posisi exp
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit]++;
  }

  // Prefix sum
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // Build output (traverse dari belakang untuk stable sort)
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    const pos = count[digit] - 1;
    output[pos] = arr[i];
    count[digit]--;
  }

  return output;
}

// ============================================
// Visualisasi Step-by-Step
// ============================================

function radixSortVisualized(arr) {
  if (arr.length <= 1) return arr;

  const max = Math.max(...arr);
  const maxDigits = String(max).length;
  let result = [...arr];

  console.log("Array awal:", [...arr]);
  console.log(`Max value: ${max} (${maxDigits} digit)`);
  console.log("─".repeat(60));

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    const digitName = exp === 1 ? "Satuan" : exp === 10 ? "Puluhan" : exp === 100 ? "Ratusan" : `10^${Math.log10(exp)}`;

    console.log(`\n📊 Sort berdasarkan ${digitName} (exp=${exp}):`);

    // Tampilkan digit yang digunakan
    const digits = result.map((num) => Math.floor(num / exp) % 10);
    console.log(`  Angka : [${result.map((n) => String(n).padStart(4)).join(",")}]`);
    console.log(`  Digit : [${digits.map((d) => String(d).padStart(4)).join(",")}]`);

    // Tampilkan bucket
    const buckets = Array.from({ length: 10 }, () => []);
    for (const num of result) {
      const digit = Math.floor(num / exp) % 10;
      buckets[digit].push(num);
    }

    console.log("  Buckets:");
    for (let i = 0; i < 10; i++) {
      if (buckets[i].length > 0) {
        console.log(`    [${i}]: ${buckets[i].join(", ")}`);
      }
    }

    result = countingSortByDigit(result, exp);
    console.log(`  Hasil : [${result.join(", ")}]`);
  }

  console.log("\n" + "─".repeat(60));
  console.log("Hasil akhir:", result);
  return result;
}

// ============================================
// Demo
// ============================================

console.log("=== RADIX SORT ===\n");

// Test basic
const arr1 = [170, 45, 75, 90, 802, 24, 2, 66];
console.log("Sebelum:", [...arr1]);
console.log("Sesudah:", radixSort([...arr1]));

// Test visualisasi
console.log("\n=== Visualisasi ===\n");
radixSortVisualized([170, 45, 75, 90, 802, 24, 2, 66]);

// Test dengan angka negatif
console.log("\n=== Angka Negatif ===");
console.log("Campuran:", radixSort([-5, 3, -1, 8, 0, -3, 7]));

// Test edge cases
console.log("\n=== Edge Cases ===");
console.log("Sudah terurut:", radixSort([1, 2, 3, 4, 5]));
console.log("Terbalik:", radixSort([5, 4, 3, 2, 1]));
console.log("Satu elemen:", radixSort([42]));
console.log("Kosong:", radixSort([]));
console.log("Besar:", radixSort([9999, 1234, 5678, 111, 42]));
