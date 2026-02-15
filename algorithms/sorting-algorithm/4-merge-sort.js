// ============================================
// Merge Sort Algorithm
// ============================================
// Time Complexity:
//   - Best Case    : O(n log n)
//   - Average Case : O(n log n)
//   - Worst Case   : O(n log n)
// Space Complexity : O(n) → butuh array tambahan
// Stable           : Ya
// ============================================
// Cara kerja (Divide and Conquer):
// 1. DIVIDE  : Bagi array menjadi dua bagian sama besar.
// 2. CONQUER : Rekursif sort masing-masing bagian.
// 3. COMBINE : Gabungkan (merge) dua bagian yang sudah
//              terurut menjadi satu array terurut.
// ============================================

function mergeSort(arr) {
  // Base case: array dengan 0 atau 1 elemen sudah terurut
  if (arr.length <= 1) return arr;

  // Divide: bagi dua
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  // Conquer: rekursif sort
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  // Combine: merge dua array terurut
  return merge(sortedLeft, sortedRight);
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  // Bandingkan elemen dari kedua array
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // Tambahkan sisa elemen
  while (i < left.length) {
    result.push(left[i]);
    i++;
  }

  while (j < right.length) {
    result.push(right[j]);
    j++;
  }

  return result;
}

// ============================================
// Visualisasi Step-by-Step
// ============================================

function mergeSortVisualized(arr, depth = 0) {
  const indent = "  ".repeat(depth);

  if (arr.length <= 1) {
    console.log(`${indent}↩ Base case: [${arr}]`);
    return arr;
  }

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  console.log(`${indent}📌 Split [${arr}] → kiri=[${left}], kanan=[${right}]`);

  const sortedLeft = mergeSortVisualized(left, depth + 1);
  const sortedRight = mergeSortVisualized(right, depth + 1);

  const merged = merge(sortedLeft, sortedRight);
  console.log(`${indent}🔀 Merge [${sortedLeft}] + [${sortedRight}] → [${merged}]`);

  return merged;
}

// ============================================
// Merge Sort In-Place (Alternatif tanpa return array baru)
// ============================================

function mergeSortInPlace(arr, start = 0, end = arr.length - 1) {
  if (start >= end) return;

  const mid = Math.floor((start + end) / 2);

  mergeSortInPlace(arr, start, mid);
  mergeSortInPlace(arr, mid + 1, end);
  mergeInPlace(arr, start, mid, end);
}

function mergeInPlace(arr, start, mid, end) {
  const left = arr.slice(start, mid + 1);
  const right = arr.slice(mid + 1, end + 1);

  let i = 0,
    j = 0,
    k = start;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      arr[k] = left[i];
      i++;
    } else {
      arr[k] = right[j];
      j++;
    }
    k++;
  }

  while (i < left.length) {
    arr[k] = left[i];
    i++;
    k++;
  }

  while (j < right.length) {
    arr[k] = right[j];
    j++;
    k++;
  }
}

// ============================================
// Demo
// ============================================

console.log("=== MERGE SORT ===\n");

// Test basic
const arr1 = [38, 27, 43, 3, 9, 82, 10];
console.log("Sebelum:", [...arr1]);
console.log("Sesudah:", mergeSort([...arr1]));

// Test visualisasi
console.log("\n=== Visualisasi ===\n");
mergeSortVisualized([6, 3, 8, 1, 5]);

// Test in-place
console.log("\n=== In-Place Version ===");
const arr2 = [38, 27, 43, 3, 9, 82, 10];
console.log("Sebelum:", [...arr2]);
mergeSortInPlace(arr2);
console.log("Sesudah:", arr2);

// Test edge cases
console.log("\n=== Edge Cases ===");
console.log("Sudah terurut:", mergeSort([1, 2, 3, 4, 5]));
console.log("Terbalik:", mergeSort([5, 4, 3, 2, 1]));
console.log("Satu elemen:", mergeSort([42]));
console.log("Kosong:", mergeSort([]));
console.log("Duplikat:", mergeSort([3, 1, 3, 2, 1]));
