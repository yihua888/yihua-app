export default {}
/**
 * 给你一根长度为 n 的绳子，请把绳子剪成整数长度的 m 段（m、n都是整数，n>1并且m>1），
 * 每段绳子的长度记为 k[0],k[1]...k[m] 。请问 k[0]k[1]...*k[m] 可能的最大乘积是多少？
 * 例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。
 */

/**
 * @param {number} num 
 * @returns {number}
 */
const cuttingRope = (num) => {
    if (num < 4) return num - 1
    const a = num % 3
    const b = parseInt(num / 3)
    if (a === 0) return 3 ** b
    if (a === 1) return 2 * 2 * (3 ** (b - 1))
    if (a === 2) return 2 * (3 ** b)
}

// console.log(cuttingRope(8));

/**
 *@describe 给定一个非负整数数组，你最初位于数组的第一个位置。数组中的每个元素代表你在该位置可以跳跃的最大长度。判断你是否能够到达最后一个位置。
 *1. 使用一个变量保存当前可到达的最大位置
 *2. 时刻更新最大位置
 *3. 可达位置小于数组长度返回false，反之即反
 */


/**
 * @param {number[]} nums 
 * @returns {boolean}
 */
const canJump = (nums) => {
    let k = 0
    for(let i = 0 ; i < nums.length ; i++ ){
        if(i > k) return false;
        k = Math.max(k , i + nums[i])
    }
    return true
}

// console.log(canJump([1,0,4,0]));

/**
 * 在一条环路上有 N 个加油站，其中第 i 个加油站有汽油 gas[i] 升。
 * 你有一辆油箱容量无限的的汽车，从第 i 个加油站开往第 i+1 个加油站需要消耗汽油 cost[i] 升。
 * 你从其中的一个加油站出发，开始时油箱为空。如果你可以绕环路行驶一周，则返回出发时加油站的编号，否则返回 -1
 * 1. gas - cost >= 0才能绕场一周，以此思想判断能否行驶一周
 * 2. 从正确初始位置开始，拥有的汽油总是比消耗的汽油多,以此思想寻找初始位置
 */

/**
 * @param {number[]} gas 
 * @param {number[]} cost 
 * @returns {number}
 */
const canCompleteCircuit = (gas,cost) => {
    let cur = 0 , total = 0 ,start = 0 ;
    for(let i = 0; i < gas.length ; i++){
        total += gas[i] - cost[i]
        if(cur < 0){
            start = i
            cur = gas[i] - cost[i]
        }else cur += gas[i] -cost[i]
    }
    return total >= 0 ? start : -1
}

// console.log(canCompleteCircuit([3,4,5,6,7,8,9],[4,8,3,6,7,9,4]));
