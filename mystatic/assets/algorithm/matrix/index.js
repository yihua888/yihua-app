export default {}
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
const spiralOrder = function (matrix) {
    const row = matrix.length
    if (row < 1) return []
    const col = matrix[0].length
    if (col < 1) return []
    let top = 0, left = 0, right = col - 1, bottom = row - 1;
    const rst = []
    while (bottom >= top && right >= left) {
        // 走横向
        for (let j = left; j <= right; j++) {
            rst.push(matrix[top][j])
        }
        // 走纵向
        for (let i = top + 1; i <= bottom; i++) {
            rst.push(matrix[i][right])
        }
        if (left < right && top < bottom) {
            // 走反横向
            for (let j = right - 1; j > left; j--) {
                rst.push(matrix[bottom][j])
            }
            // 走反纵向
            for (let i = bottom; i > top; i--) {
                rst.push(matrix[i][left])
            }
        }
        [left, right, top, bottom] = [left + 1, right - 1, top + 1, bottom - 1]
    }
    return rst
};

// console.log(spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));
// console.log(spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]));

/**
 * @param {number[][]} arr 
 * @returns {number[][]}
 */
const rotate = arr => {
    if (!arr.length) return [];
    const rst = []
    for (let i = 0; i < arr[0].length; i++) {
        const temp = []
        for (let j = 0; j < arr.length; j++) {
            temp.push(arr[j][arr[0].length - 1 - i])
        }
        rst.push(temp)
    }
    return rst
}

/**
 * @param {number[][]} matrix 
 * @returns {number[]}
 */
const printMatrix = matrix => {
    if (matrix.length < 1) return []
    const rst = []
    while (matrix.length) {
        for (let i = 0; i < matrix[0].length; i++) {
            rst.push(matrix[0][i])
        }
        // 当前层取完，可以去除
        matrix.splice(0, 1)
        // 使用魔法函数，进行顺时针旋转
        matrix = rotate(matrix)
    }
    return rst
}
// console.log(printMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));

/**
 * @param {number[][]} arr 
 */
const clockwiseRota = arr => {
    const n = arr.length
    // 水平翻转
    for (let i = 0; i < n >> 1; i++) {
        for (let j = 0; j < n; j++) {
            [arr[i][j], arr[n - i - 1][j]] = [arr[n - i - 1][j], arr[i][j]]
        }
    }
    // 对角线翻转
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            [arr[i][j], arr[j][i]] = [arr[j][i], arr[i][j]]
        }
    }
    return arr
}
// console.log(clockwiseRota([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));


// 给定一个正整数 n，生成一个包含 1 到 n2 所有元素，且元素按顺时针顺序螺旋排列的正方形矩阵

/**
 * https://leetcode.cn/problems/spiral-matrix-ii/
 * @param {number} n
 * @return {number[][]}
 */
const generateMatrix = function (n) {
    if (n < 1) return []
    if (n === 1) return [[1]]
    const rst = new Array(n).fill([])
    let top = 0, bottom = n - 1, left = 0, right = n - 1, cur = 1;

    while (top <= bottom && left <= right) {
        // 走横向
        for (let j = left; j <= right; j++) {
            rst[top][j] = cur++
        }
        // 走纵向
        for (let i = top + 1; i <= bottom; i++) {
            rst[i][right] = cur++
        }

        if (top < bottom && left < right) {
            // 走反横向
            for (let j = right - 1; j > left; j--) {
                rst[bottom][j] = cur++
            }

            // 走反纵向
            for (let i = bottom; i > top; i--) {
                rst[i][left] = cur++
            }
        }
        [left, right, top, bottom] = [left + 1, right - 1, top + 1, bottom - 1]
    }
    return rst
};

// console.log(generateMatrix(3))
// 矩阵置零
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const setZeroes = function (matrix) {
    const cols = []
    const rows = []
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === 0) {
                cols.push(j)
                rows.push(i)
            }
        }
    }
    for (let i = 0; i < matrix.length; i++) {
        cols.forEach(col => {
            matrix[i][col] = 0
        })
    }

    for (let j = 0; j < matrix[0].length; j++) {
        rows.forEach(row => {
            matrix[row][j] = 0
        })
    }
};

const testData = [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]
// console.time('0')
// setZeroes(testData)
// console.timeEnd('0')

// console.log(testData);

// 矩阵置零
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const setZeroes1 = function (matrix) {
    const setZero = (row, col) => {
        for (let i = 0; i < matrix.length; i++) {
            if (i <= row) {
                matrix[i][col] = 0
            } else if (!Object.is(0, matrix[i][col])) {
                matrix[i][col] = -0
            }
        }

        for (let j = 0; j < matrix[0].length; j++) {
            if (j <= col) {
                matrix[row][j] = 0
            } else if (!Object.is(0, matrix[row][j])) {
                matrix[row][j] = -0
            }
        }

    }
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (Object.is(matrix[i][j], 0)) {
                // 将已经不能访问的置为0，能访问的不为0的置为-0
                setZero(i, j)
            } else if (Object.is(matrix[i][j], -0)) {
                matrix[i][j] = 0
            }
        }
    }
};
// const testData1 = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
// console.time('1')
// setZeroes1(testData1)
// console.timeEnd('1')
// console.log(testData1);
