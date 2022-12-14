/**
 * 你是一个专业的小偷，计划偷窃沿街的房屋。
 * 每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，
 * 如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。给定一个代表每个房屋存放金额的非负整数数组，
 * 计算你在不触动警报装置的情况下，能够偷窃到的最高金额。
 */

/**
 * @describe 输入一个数组，表示小偷在当前房屋可以拿到的金额。
 * @param {number[]} nums
 * @returns {number}
 */
 const rob = (nums) => {
    const len = nums.length
    if (len === 0) return 0
    if (len === 1) return nums[0]
    if (len === 2) return Math.max(nums[0], nums[1])
    const dp = [nums[0], Math.max(nums[0], nums[1])]
    for (let i = 2; i < len; i++) {
        dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
    }
    return Math.max(dp[len - 1], dp[len - 2])
}

const robArr = [1, 9, 3, 4, 5, 9, 6, 0, 4]
// console.log(rob(robArr));
