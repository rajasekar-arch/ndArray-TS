
/**
 * @file NdArray.ts
 * @description The core NdArray class for N-dimensional array operations.
 */

/**
 * Represents an N-dimensional array, providing functionalities similar to NumPy's ndarray.
 */
export class NdArray {
    public data: number[]; // Flat array storing the elements
    public shape: number[]; // Dimensions of the array
    public strides: number[]; // Stride for each dimension to calculate index
    public size: number; // Total number of elements
    public ndim: number; // Number of dimensions

    /**
     * Creates an instance of NdArray.
     * @param data The flat array of numbers.
     * @param shape The shape (dimensions) of the array.
     * @throws {Error} If data length does not match the product of shape dimensions.
     */
    constructor(data: number[], shape: number[]) {
        this.shape = shape;
        this.ndim = shape.length;
        this.size = shape.reduce((acc, dim) => acc * dim, 1);

        if (data.length !== this.size) {
            throw new Error(`Data length (${data.length}) does not match expected size (${this.size}) for shape ${shape}`);
        }
        this.data = [...data]; // Create a copy to ensure immutability of original data array
        this.strides = this.calculateStrides(shape);
    }

    /**
     * Calculates the strides for each dimension.
     * Strides indicate how many elements to skip in the flat data array to move to the next element along a dimension.
     * @param shape The shape of the array.
     * @returns An array of strides.
     */
    private calculateStrides(shape: number[]): number[] {
        const strides = new Array(shape.length).fill(1);
        for (let i = shape.length - 2; i >= 0; i--) {
            strides[i] = strides[i + 1] * shape[i + 1];
        }
        return strides;
    }

    /**
     * Calculates the flat index in the data array from multi-dimensional indices.
     * @param indices An array of indices for each dimension.
     * @returns The flat index.
     * @throws {Error} If the number of indices does not match the number of dimensions,
     * or if any index is out of bounds.
     */
    private getFlatIndex(indices: number[]): number {
        if (indices.length !== this.ndim) {
            throw new Error(`Expected ${this.ndim} indices, but got ${indices.length}`);
        }
        let flatIndex = 0;
        for (let i = 0; i < this.ndim; i++) {
            if (indices[i] < 0 || indices[i] >= this.shape[i]) {
                throw new Error(`Index ${indices[i]} out of bounds for dimension ${i} with size ${this.shape[i]}`);
            }
            flatIndex += indices[i] * this.strides[i];
        }
        return flatIndex;
    }

    /**
     * Creates a new NdArray filled with zeros.
     * @param shape The shape of the new array.
     * @returns A new NdArray instance.
     */
    static zeros(shape: number[]): NdArray {
        const size = shape.reduce((acc, dim) => acc * dim, 1);
        const data = new Array(size).fill(0);
        return new NdArray(data, shape);
    }

    /**
     * Creates a new NdArray filled with ones.
     * @param shape The shape of the new array.
     * @returns A new NdArray instance.
     */
    static ones(shape: number[]): NdArray {
        const size = shape.reduce((acc, dim) => acc * dim, 1);
        const data = new Array(size).fill(1);
        return new NdArray(data, shape);
    }

    /**
     * Creates a new NdArray with evenly spaced values within a given interval.
     * Similar to NumPy's `arange`.
     * @param start The start of the interval (inclusive).
     * @param stop The end of the interval (exclusive).
     * @param step The spacing between values (default: 1).
     * @returns A new NdArray instance.
     */
    static arange(start: number, stop: number, step: number = 1): NdArray {
        const data: number[] = [];
        for (let i = start; i < stop; i += step) {
            data.push(i);
        }
        return new NdArray(data, [data.length]);
    }

    /**
     * Returns the element at the specified multi-dimensional indices.
     * @param indices An array of indices for each dimension.
     * @returns The value at the given indices.
     */
    get(...indices: number[]): number {
        const flatIndex = this.getFlatIndex(indices);
        return this.data[flatIndex];
    }

    /**
     * Sets the element at the specified multi-dimensional indices to a new value.
     * @param indices An array of indices for each dimension.
     * @param value The new value to set.
     */
    set(indices: number[], value: number): void {
        const flatIndex = this.getFlatIndex(indices);
        this.data[flatIndex] = value;
    }

    /**
     * Reshapes the array to a new shape. The total number of elements must remain the same.
     * @param newShape The new shape (dimensions) for the array.
     * @returns A new NdArray instance with the reshaped view of the same data.
     * @throws {Error} If the new shape does not result in the same total number of elements.
     */
    reshape(newShape: number[]): NdArray {
        const newSize = newShape.reduce((acc, dim) => acc * dim, 1);
        if (newSize !== this.size) {
            throw new Error(`Cannot reshape array of size ${this.size} into shape ${newShape} with size ${newSize}`);
        }
        // Create a new instance with a copy of the data and the new shape
        return new NdArray([...this.data], newShape);
    }

    /**
     * Performs element-wise addition with another NdArray or a scalar.
     * @param other The other NdArray or a number to add.
     * @returns A new NdArray with the result.
     * @throws {Error} If shapes are not compatible for element-wise operation.
     */
    add(other: NdArray | number): NdArray {
        const resultData = new Array(this.size);
        if (typeof other === 'number') {
            for (let i = 0; i < this.size; i++) {
                resultData[i] = this.data[i] + other;
            }
        } else {
            if (!this.isShapeCompatible(other)) {
                throw new Error(`Operands could not be broadcast together with shapes ${this.shape} and ${other.shape}`);
            }
            for (let i = 0; i < this.size; i++) {
                resultData[i] = this.data[i] + other.data[i];
            }
        }
        return new NdArray(resultData, [...this.shape]);
    }

    /**
     * Performs element-wise subtraction with another NdArray or a scalar.
     * @param other The other NdArray or a number to subtract.
     * @returns A new NdArray with the result.
     * @throws {Error} If shapes are not compatible for element-wise operation.
     */
    subtract(other: NdArray | number): NdArray {
        const resultData = new Array(this.size);
        if (typeof other === 'number') {
            for (let i = 0; i < this.size; i++) {
                resultData[i] = this.data[i] - other;
            }
        } else {
            if (!this.isShapeCompatible(other)) {
                throw new Error(`Operands could not be broadcast together with shapes ${this.shape} and ${other.shape}`);
            }
            for (let i = 0; i < this.size; i++) {
                resultData[i] = this.data[i] - other.data[i];
            }
        }
        return new NdArray(resultData, [...this.shape]);
    }

    /**
     * Performs element-wise multiplication with another NdArray or a scalar.
     * @param other The other NdArray or a number to multiply.
     * @returns A new NdArray with the result.
     * @throws {Error} If shapes are not compatible for element-wise operation.
     */
    multiply(other: NdArray | number): NdArray {
        const resultData = new Array(this.size);
        if (typeof other === 'number') {
            for (let i = 0; i < this.size; i++) {
                resultData[i] = this.data[i] * other;
            }
        } else {
            if (!this.isShapeCompatible(other)) {
                throw new Error(`Operands could not be broadcast together with shapes ${this.shape} and ${other.shape}`);
            }
            for (let i = 0; i < this.size; i++) {
                resultData[i] = this.data[i] * other.data[i];
            }
        }
        return new NdArray(resultData, [...this.shape]);
    }

    /**
     * Performs element-wise division with another NdArray or a scalar.
     * @param other The other NdArray or a number to divide by.
     * @returns A new NdArray with the result.
     * @throws {Error} If shapes are not compatible for element-wise operation, or division by zero occurs.
     */
    divide(other: NdArray | number): NdArray {
        const resultData = new Array(this.size);
        if (typeof other === 'number') {
            if (other === 0) throw new Error("Division by zero");
            for (let i = 0; i < this.size; i++) {
                resultData[i] = this.data[i] / other;
            }
        } else {
            if (!this.isShapeCompatible(other)) {
                throw new Error(`Operands could not be broadcast together with shapes ${this.shape} and ${other.shape}`);
            }
            for (let i = 0; i < this.size; i++) {
                if (other.data[i] === 0) throw new Error("Division by zero encountered in element-wise division");
                resultData[i] = this.data[i] / other.data[i];
            }
        }
        return new NdArray(resultData, [...this.shape]);
    }

    /**
     * Performs matrix multiplication (dot product) for 2D arrays.
     * @param other The other NdArray to multiply with.
     * @returns A new NdArray with the result of the dot product.
     * @throws {Error} If arrays are not 2D or shapes are incompatible for dot product.
     */
    dot(other: NdArray): NdArray {
        if (this.ndim !== 2 || other.ndim !== 2) {
            throw new Error("Dot product currently only supported for 2D arrays.");
        }
        if (this.shape[1] !== other.shape[0]) {
            throw new Error(`Shapes incompatible for dot product: (${this.shape}) vs (${other.shape})`);
        }

        const rowsA = this.shape[0];
        const colsA = this.shape[1];
        const colsB = other.shape[1];

        const resultData = new Array(rowsA * colsB).fill(0);
        const result = new NdArray(resultData, [rowsA, colsB]);

        for (let i = 0; i < rowsA; i++) {
            for (let j = 0; j < colsB; j++) {
                let sum = 0;
                for (let k = 0; k < colsA; k++) {
                    sum += this.get(i, k) * other.get(k, j);
                }
                result.set([i, j], sum);
            }
        }
        return result;
    }

    /**
     * Checks if the shape of another NdArray is compatible for element-wise operations.
     * For simplicity, this implementation only checks for exact shape match.
     * A full NumPy-like broadcasting mechanism would be more complex.
     * @param other The other NdArray.
     * @returns True if shapes are compatible, false otherwise.
     */
    private isShapeCompatible(other: NdArray): boolean {
        if (this.ndim !== other.ndim) {
            return false;
        }
        for (let i = 0; i < this.ndim; i++) {
            if (this.shape[i] !== other.shape[i]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Returns a string representation of the NdArray.
     * @returns A string representing the array.
     */
    toString(): string {
        let str = `NdArray(shape=${this.shape}, data=[\n`;

        // Simple 1D/2D representation for readability
        if (this.ndim === 1) {
            str += `  [${this.data.join(', ')}]\n`;
        } else if (this.ndim === 2) {
            for (let i = 0; i < this.shape[0]; i++) {
                const row: number[] = [];
                for (let j = 0; j < this.shape[1]; j++) {
                    row.push(this.get(i, j));
                }
                str += `  [${row.join(', ')}]\n`;
            }
        } else {
            // For higher dimensions, just show flat data and shape
            str += `  ${this.data.join(', ')}\n`;
        }
        str += `])`;
        return str;
    }
}
