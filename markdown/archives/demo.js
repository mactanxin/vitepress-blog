
/**
 * Sorts an array in ascending order using the quicksort algorithm.
 * @param {Array} arr - The array to be sorted.
 * @returns {Array} - A new sorted array in ascending order.
 * @example
 * const unsortedArr = [4, 6, 2, 8, 3];
 * const sortedArr = quickSort(unsortedArr);
 * console.log(sortedArr); // Output: [2, 3, 4, 6, 8]
 */
const quickSort = (arr) => {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];
  
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  
  return [...quickSort(left), pivot, ...quickSort(right)];
};


const arr = [5, 2, 9, 3, 4, 2, 15, 12];

const sortedArr = quickSort(arr);

console.log(sortedArr); // [2, 2, 3, 4, 5, 9, 12, 15]
