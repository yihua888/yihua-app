export default {}

/**
 * 岛屿数量:https://leetcode.cn/problems/number-of-islands/solution/dao-yu-shu-liang-by-leetcode/
 * @param {string[][]} grid 
 * @returns 
 */
const numIslands = grid => {
    const row = grid.length
    if (row === 0) return 0
    const col = grid[0].length
    if (col === 0) return 0
    // 映射
    const parents = new Array(col * row).fill(0).map((v, i) => i)

    const find = (p) => {
        // 如果当前的位置和所在下标不一样表示已经被联通，则需要更新其联通
        p !== parents[p] && (parents[p] = find(parents[p]))
        return parents[p]
    }

    /**
     * 把p1连到p2所在岛屿
     * @param {number} p1 
     * @param {number} p2 
     */
    const union = (p1, p2) => {
        p1 = find(p1)
        p2 = find(p2)
        p1 !== p2 && (parents[p1] = p2)
    }

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (grid[i][j] === '1') {
                i < row - 1 && grid[i + 1][j] === '1' && union((i + 1) * col + j, i * col + j)
                j < col - 1 && grid[i][j + 1] === '1' && union(i * col + j + 1, i * col + j)
            } else {
                parents[i * col + j] = false
            }
        }
    }
    return parents.filter((v, i) => v === i).length
}

const grid = [["1", "1", "1"], ["0", "1", "0"], ["1", "1", "1"]]
// console.log(numIslands(grid));

/**
 * @link https://leetcode.cn/problems/surrounded-regions/submissions/
 * @param {character[][]} board
 * @return {void}
 */
const solve = board => {
    const row = board.length;
    if (row <= 2) return board;
    const col = board[0].length;
    if (col <= 2) return board
    // 映射
    const parents = new Array(col * row).fill(0).map((v, i) => i)

    const find = p => {
        p !== parents[p] && (parents[p] = find(parents[p]))
        return parents[p]
    }

    const union = (p1, p2) => {
        p1 = find(p1)
        p2 = find(p2)
        p1 !== p2 && (parents[p1] = parents[p2])
    }

    const isConnected = (p1, p2) => find(p1) === find(p2)

    const flag = col * row
    parents.push(col * row)

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (board[i][j] === 'O') {
                if (i === 0 || j === 0 || i === row - 1 || j === col - 1) {
                    union(i * col + j, flag)
                    i === 0 && board[i + 1][j] === 'O' && union(i * col + j, (i + 1) * col + j);
                    j === 0 && board[i][j + 1] === 'O' && union(i * col + j, i * col + j + 1);
                } else {
                    i < row - 1 && board[i + 1][j] === 'O' && union(i * col + j, (i + 1) * col + j);
                    j < col - 1 && board[i][j + 1] === 'O' && union(i * col + j, i * col + j + 1);
                }
            }
        }
    }

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (board[i][j] === 'O' && !isConnected(i * col + j, flag)) {
                board[i][j] = 'X'
            }
        }
    }
};
// const board = [["O"]]
// solve(board)
// console.log(board);

/**
 * HW0-phf
 * 输入一个二维数组，0代表通过，1代表障碍，2代表人，3代表餐厅，问这些人可以选择几个餐厅聚餐
 */
{
    /**
     * @param {number[][]} arr 
     * @returns {number}
     */
    const dinnerParty = arr => {
        const row = arr.length
        if (row === 0) return 0
        const col = arr[0].length
        if (col === 0) return 0
        const parents = new Array(col * row).fill(0).map((v, i) => i)

        const find = p => {
            p !== parents[p] && (parents[p] = find(parents[p]))
            return parents[p]
        }

        const union = (p1, p2) => {
            p1 = find(p1)
            p2 = find(p2)
            p1 !== p2 && (parents[p1] = p2)
        }

        const unionCondition = num => {
            return num === 0 || num === 2 || num === 3
        }

        const pArr = []
        const cArr = []

        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                if (arr[i][j] === 2) {
                    pArr.push(i * col + j)
                } else if (arr[i][j] === 3) {
                    cArr.push(i * col + j)
                }
                if (unionCondition(arr[i][j])) {
                    i < row - 1 && unionCondition(arr[i + 1][j]) && union(i * col + j, (i + 1) * col + j);
                    j < col - 1 && unionCondition(arr[i][j + 1]) && union(i * col + j, i * col + j + 1);
                }
            }
        }

        const isUnicom = (p1, p2) => {
            return find(p1) === find(p2)
        }

        const plast = pArr.pop()
        let flag = true
        pArr.some(p => {
            if (!isUnicom(p, plast)) {
                flag = false
                return true
            }
        })

        if (!flag) return 0

        let conunt = 0
        cArr.forEach(c => {
            if (isUnicom(c, plast)) {
                conunt++
            }
        })

        return conunt
    }

    const arr = [
        [2, 0, 1, 0, 3],
        [0, 0, 1, 1, 1],
        [1, 0, 0, 0, 2],
        [3, 1, 1, 0, 0]
    ]
    // console.log('---------------phf-------------');
    // console.log(dinnerParty(arr));
}


/**
 * n 对情侣坐在连续排列的 2n 个座位上，想要牵到对方的手。
 * 人和座位由一个整数数组 row 表示，其中 row[i] 是坐在第 i 个座位上的人的 ID。
 * 情侣们按顺序编号，第一对是 (0, 1)，第二对是 (2, 3)，以此类推，最后一对是 (2n-2, 2n-1)。
 * 返回 最少交换座位的次数，以便每对情侣可以并肩坐在一起。 每次交换可选择任意两人，让他们站起来交换座位。
 * https://leetcode.cn/problems/couples-holding-hands
 */
// /**
//  * @param {number[]} row 
//  */
// const minSwapsCouples = function (row) {
//     const len = row.length
//     const posMap = new Array(len + 1)
//     row.forEach((v, k) => { posMap[v] = k })
//     let times = 0
//     for (let i = 0; i < len; i += 2) {
//         let lover = row[i] ^ 1;
//         if (row[i + 1] === lover) continue;
//         let next = row[i + 1];
//         times++;
//         [row[i + 1], row[posMap[lover]]] = [row[posMap[lover]], row[i + 1]];
//         [posMap[lover], posMap[next]] = [posMap[next], posMap[lover]];
//     }
//     return times
// };
// console.log(minSwapsCouples([2, 7, 5, 4, 3, 1 , 6 ,0]));


/**
 * @param {number[]} row 
 */
const minSwapsCouples = function (row) {
    const len = row.length
    const tot = len >> 1
    const f = new Array(tot).fill(0).map((v, i) => i)

    const getf = (x) => {
        x !== f[x] && (f[x] = getf(f[x]))
        return f[x]
    }

    const add = (x, y) => {
        f[getf(x)] = getf(y)
    }

    for (let i = 0; i < len; i += 2) {
        const l = row[i] >> 1
        const r = (row[i] + 1) >> 1
        add(l, r)
    }

    const map = new Map()
    for (let i = 0; i < tot; i++) {
        const fx = getf(i)
        if (map.has(fx)) {
            map.set(fx, map.get(fx) + 1)
        } else {
            map.set(fx, 1)
        }
    }

    let times = 0
    for (const [f, sz] of map.entries()) {
        times += sz - 1
    }

    return times
};


// console.log(minSwapsCouples([2, 7, 5, 4, 3, 1, 6, 0]));