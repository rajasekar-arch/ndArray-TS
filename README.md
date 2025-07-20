# **`ndarray-ts`**

A lightweight N-dimensional array (ndarray) library for TypeScript and JavaScript, inspired by NumPy. This package provides a foundational `NdArray` class for efficient numerical operations on multi-dimensional data.

[![npm version](https://badge.fury.io/js/ndarray-ts.svg)](https://www.npmjs.com/package/ndarray-ts)
https://badge.fury.io/js/ndarray-ts.svg
https://www.npmjs.com/package/ndarray-ts
[![Total Downloads](https://img.shields.io/npm/dt/ndarray-ts.svg)](https://www.npmjs.com/package/ndarray-ts)
## **🚀 Features**

`ndarray-ts` aims to provide core functionalities for working with N-dimensional arrays, including:

- **Flexible Array Creation:** Initialize arrays with custom data and shapes, or use convenience methods like `zeros()`, `ones()`, and `arange()`.
- **Multi-dimensional Indexing:** Easily access and modify elements using multi-dimensional indices (e.g., `arr.get(row, col)`, `arr.set([row, col], value)`).
- **Reshaping:** Change the dimensions of an array without altering its underlying data, as long as the total number of elements remains constant.
- **Element-wise Arithmetic Operations:** Perform addition, subtraction, multiplication, and division with other `NdArray` instances or scalar values.
- **Matrix Multiplication (Dot Product):** Supports dot product for 2D arrays.
- **TypeScript Support:** Fully typed for a better development experience.

## **📦 Installation**

You can install `ndarray-ts` using npm:

npm install ndarray-ts  
\# or  
yarn add ndarray-ts

## **💡 Usage**

Here's how you can use the `NdArray` class in your TypeScript or JavaScript projects:

### **Importing the Library**

```javascript
import { NdArray } from "ndarray-ts";
// For CommonJS (Node.js):
const { NdArray } = require("ndarray-ts");
```

### **Array Creation**

```javascript
// Create a 2x3 array from a flat data array
const arr1 = new NdArray([1, 2, 3, 4, 5, 6], [2, 3]);
console.log("arr1 (2x3):\n", arr1.toString());
/*
Output:
NdArray(shape=2,3, data=[
  [1, 2, 3]
  [4, 5, 6]
])
*/

// Create a 3x2 array filled with zeros
const zerosArr = NdArray.zeros([3, 2]);
console.log("\nzerosArr (3x2):\n", zerosArr.toString());
/*
Output:
NdArray(shape=3,2, data=[
  [0, 0]
  [0, 0]
  [0, 0]
])
*/

// Create a 1D array with values from 10 (inclusive) to 20 (exclusive), stepping by 3
const rangeArr = NdArray.arange(10, 20, 3);
console.log("\nrangeArr (arange 10-20 step 3):\n", rangeArr.toString());
/*
Output:
NdArray(shape=6, data=[
  [10, 13, 16, 19]
])
*/
```

### **Accessing and Modifying Elements**

```javascript
const arr = new NdArray([10, 11, 12, 13, 14, 15], [2, 3]);
console.log("Original array:\n", arr.toString());

// Get an element at specific indices
console.log("Element at [0, 1]:", arr.get(0, 1)); // Output: 11

// Set an element at specific indices
arr.set([1, 2], 99);
console.log("Array after setting [1, 2] to 99:\n", arr.toString());
/*
Output:
NdArray(shape=2,3, data=[
  [10, 11, 12]
  [13, 14, 99]
])
*/
```

### **Reshaping Arrays**

```javascript
const originalArr = new NdArray([1, 2, 3, 4, 5, 6], [2, 3]);
console.log("Original array (2x3):\n", originalArr.toString());

// Reshape to a 3x2 array
const reshapedArr = originalArr.reshape([3, 2]);
console.log("Reshaped array (3x2):\n", reshapedArr.toString());
/*
Output:
NdArray(shape=3,2, data=[
  [1, 2]
  [3, 4]
  [5, 6]
])
*/

// Attempting to reshape to an incompatible size will throw an error
try {
    originalArr.reshape([2, 2]);
} catch (error: any) {
    console.error("Reshape Error:", error.message);
    // Output: Reshape Error: Cannot reshape array of size 6 into shape 2,2 with size 4
}

```

### **Element-wise Operations**

```javascript
const a = new NdArray([10, 20, 30, 40], [2, 2]);
const b = new NdArray([1, 2, 3, 4], [2, 2]);

console.log("Array A:\n", a.toString());
console.log("Array B:\n", b.toString());

// Addition
const sumArr = a.add(b);
console.log("\nA + B:\n", sumArr.toString());
/*
Output:
NdArray(shape=2,2, data=[
  [11, 22]
  [33, 44]
])
*/

// Scalar Multiplication
const scalarMult = a.multiply(5);
console.log("\nA * 5 (scalar):\n", scalarMult.toString());
/*
Output:
NdArray(shape=2,2, data=[
  [50, 100]
  [150, 200]
])
*/
```

### **Matrix Multiplication (Dot Product)**

```javascript
const matA = new NdArray([1, 2, 3, 4], [2, 2]); // Represents [[1, 2], [3, 4]]
const matB = new NdArray([5, 6, 7, 8], [2, 2]); // Represents [[5, 6], [7, 8]]

console.log("Matrix A:\n", matA.toString());
console.log("Matrix B:\n", matB.toString());

const dotProduct = matA.dot(matB);
console.log("\nMatrix A . Matrix B:\n", dotProduct.toString());
/*
Output:
NdArray(shape=2,2, data=[
  [19, 22]
  [43, 50]
])
*/
// Calculation:
// [[(1*5)+(2*7), (1*6)+(2*8)],
//  [(3*5)+(4*7), (3*6)+(4*8)]]
// = [[5+14, 6+16],
//    [15+28, 18+32]]
// = [[19, 22],
//    [43, 50]]
```

## **📖 API Reference**

### **`class NdArray`**

- `constructor(data: number[], shape: number[])`: Creates a new NdArray.
- `static zeros(shape: number[]): NdArray`: Creates an array filled with zeros.
- `static ones(shape: number[]): NdArray`: Creates an array filled with ones.
- `static arange(start: number, stop: number, step?: number): NdArray`: Creates an array with evenly spaced values.
- `get(...indices: number[]): number`: Retrieves the element at the given indices.
- `set(indices: number[], value: number): void`: Sets the element at the given indices.
- `reshape(newShape: number[]): NdArray`: Returns a new NdArray with the specified shape.
- `add(other: NdArray | number): NdArray`: Element-wise addition.
- `subtract(other: NdArray | number): NdArray`: Element-wise subtraction.
- `multiply(other: NdArray | number): NdArray`: Element-wise multiplication.
- `divide(other: NdArray | number): NdArray`: Element-wise division.
- `dot(other: NdArray): NdArray`: Matrix multiplication (for 2D arrays).
- `toString(): string`: Returns a string representation of the array.

## **🤝 Contributing**

Contributions are welcome\! If you have suggestions for improvements, new features, or bug fixes, please open an issue or submit a pull request on the [GitHub repository](https://github.com/rajasekar-arch/ndArray-TS).

## ❤️ Support & Share

> If you find `ndarray-ts` helpful, please consider sharing your experience! Post about it on LinkedIn, Twitter, or any social media platform. 
> 
> Tag me or the project so we can feature your post!! 
> 
> Or simply drop me an email at: rajasekar_e_c@outlook.com – I’d love to hear how you are using this package!
>
> Your support helps others discover this library and keeps the project growing!

## **📄 License**

This project is licensed under the MIT License \- see the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.
