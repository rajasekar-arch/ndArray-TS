// example.ts

import { NdArray } from './dist/index'; // Or 'ts-ndarray' if installed from npm

console.log("--- Example Usage of ts-ndarray ---");

// 1. Create an NdArray
const arr1 = new NdArray([1, 2, 3, 4, 5, 6], [2, 3]);
console.log("arr1 (2x3):\n", arr1.toString());

// 2. Create with static methods
const zerosArr = NdArray.zeros([3, 2]);
console.log("\nzerosArr (3x2):\n", zerosArr.toString());

const rangeArr = NdArray.arange(10, 20, 3);
console.log("\nrangeArr (arange 10-20 step 3):\n", rangeArr.toString());

// 3. Get and Set elements
console.log("\narr1[0, 1]:", arr1.get(0, 1)); // Should be 2
arr1.set([1, 2], 99);
console.log("arr1 after setting [1, 2] to 99:\n", arr1.toString());

// 4. Reshape
const reshapedArr = arr1.reshape([3, 2]);
console.log("\nreshapedArr (from arr1, 3x2):\n", reshapedArr.toString());

// 5. Element-wise operations
const a = new NdArray([10, 20, 30, 40], [2, 2]);
const b = new NdArray([1, 2, 3, 4], [2, 2]);

console.log("\na:\n", a.toString());
console.log("b:\n", b.toString());

const sumArr = a.add(b);
console.log("\na + b:\n", sumArr.toString());

const scalarMult = a.multiply(5);
console.log("\na * 5 (scalar):\n", scalarMult.toString());

// 6. Dot Product
const matA = new NdArray([1, 2, 3, 4], [2, 2]); // [[1, 2], [3, 4]]
const matB = new NdArray([5, 6, 7, 8], [2, 2]); // [[5, 6], [7, 8]]

console.log("\nmatA:\n", matA.toString());
console.log("matB:\n", matB.toString());

const dotProduct = matA.dot(matB);
console.log("\nmatA . matB:\n", dotProduct.toString());