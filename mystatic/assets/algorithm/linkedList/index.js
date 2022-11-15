export default {}

function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

/**
 * 创建普通链表
 * @param {any[]} arr 
 */
function createListNode(arr) {
    const head = new ListNode(arr.shift())
    let newNode = head
    arr.forEach(item => {
        newNode.next = new ListNode(item)
        newNode = newNode.next
    })
    return head
}

/**
 * 创建环形链表
 * @param {any[]} arr 
 * @param {number} pos 
 */
function createCycleListNode(arr, pos) {
    const head = new ListNode(arr.shift())
    let newNode = head
    let cycleNode = null
    arr.forEach((item, index) => {
        if (pos === index) {
            cycleNode = newNode
        }
        newNode.next = new ListNode(item)
        newNode = newNode.next
    })
    newNode.next = cycleNode
    return head
}

/**
 * 删除链表的倒数第n个节点
 * https://leetcode.cn/problems/remove-nth-node-from-end-of-list/
 */

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
const removeNthFromEnd = function (head, n) {
    if (!head) return null
    let fast = head, pre = head, len = 0, p1 = head;
    // p1走到末尾，统计总共的节点数
    while (p1) {
        len++
        p1 = p1.next
    }

    // 删除倒数第len个也就是删除第一个
    if (n === len) return head.next
    if (n > len) return head
    let delIndex = len - n
    while (delIndex--) {
        pre = fast
        fast = fast.next
    }
    pre.next = fast.next
    return head
};

// console.log(removeNthFromEnd(createListNode([1, 2, 3, 4, 5]), 5));

/**
 * 给定一个链表的 头节点 head ，请判断其是否为回文链表。
 * https://leetcode.cn/problems/aMhZSa/
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
const isPalindrome = function (head) {
    if (!head) return true;
    let slow = head, fast = head, pre = null, temp;
    // 反转链表，并且使slow指向链表的中间位置
    while (fast && fast.next) {
        fast = fast.next.next
        temp = slow
        slow = slow.next
        temp.next = pre
        pre = temp
    }

    // 存在fast,不存在fast.next，则证明是奇数个，则slow往后再移动一个到达中间位置
    if (fast) slow = slow.next
    while (pre && slow) {
        if (slow.val !== pre.val) return false
        slow = slow.next
        pre = pre.next
    }

    return true
};
// console.log(isPalindrome(createListNode([1, 2, 3, 2, 1])));

// 给定一个链表，判断链表中是否有环

/**
 * @param {ListNode} head
 * @return {boolean}
 */
const hasCycle = head => {
    let fast = head, slow = head;
    while (fast && fast.next) {
        fast = fast.next.next
        slow = slow.next
        if (fast === slow) return true
    }
    return false
}
// console.log(hasCycle(createCycleListNode([1,2,3,4,5],-1)));
// console.log(hasCycle(createCycleListNode([1,2,3,4,5],0)));

// 输入一个链表，输出该链表中倒数第k个结点。

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
const getKthFromEnd = function (head, k) {
    if (head === null || k === 0) return null;
    let fast = head, slow = head;
    while (k--) {
        fast = fast.next
    }

    while (fast) {
        fast = fast.next
        slow = slow.next
    }

    return slow
};

// console.log(getKthFromEnd(createListNode([1,2,3,4,5]),2));

/**
 * 输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。
 */

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const mergeTwoLists = function (l1, l2) {
    const head = new ListNode()
    let curNode = head, node1 = l1, node2 = l2;
    while (node1 && node2) {
        if (node1.val < node2.val) {
            curNode.next = node1
            node1 = node1.next
        } else {
            curNode.next = node2
            node2 = node2.next
        }
        curNode = curNode.next
    }
    node1 ? curNode.next = node1 : curNode.next = node2
    return head.next
};

// console.log(mergeTwoLists(createListNode([1,4,5]),createListNode([1,2,3])));


/**
 * 输入两个链表，找出它们的第一个公共结点
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const FindFirstCommonNode = (l1, l2) => {
    let p1 = l1, p2 = l2;
    // p1先走完自己的再去走p2,p2走完自己再走p1，这样就可以找到交点，
    // 因为这样遇到的相等的点表达后面的距离是相等的，则说明改点是遇到的第一个点
    while (p1 !== p2) {
        p1 = p1 === null ? l2 : p1.next;
        p2 = p2 === null ? l1 : p2.next;
    }
    return p1;
}

/**
 * 找出环形链表入环位置
 */

/**
 * @param {ListNode} head 
 * @returns {ListNode}
 */
const detectCycle = head => {
    if(!head || !head.next) return null
    let fast  = head.next.next  , slow  = head.next  , p = head ;
    while(fast && fast.next && fast !== slow){
        fast = fast.next.next
        slow = slow.next
    }
    if(!fast || !fast.next) return null
    // 有环，fast比slow快一圈，把环前看成a,slow在的位置为环中b,环中到末尾差c
    // 则有a+(n+1)b+nc=2(a+b)⟹a=c+(n−1)(b+c)，所以slow走c到达是head走a的位置
    while(slow !== p){
        p = p.next
        slow = slow.next
    }
    return p
}

/**
 * @param {ListNode} head 
 * @returns {ListNode}
 */
const detectCycle1 = head => {
    let set = new Set()
    while(head){
        if(set.has(head)){
            return head
        }
        set.add(head)
        head = head.next
    }
    return null
}
// console.log(detectCycle1(createCycleListNode([1,2,3,4,5],3)))

/**
 * https://leetcode.cn/problems/valid-palindrome/
 * @param {string} str 
 * @returns {boolean}
 */
const isPalindromeStr = str => {
    const reg = /[a-z]|[0-9]/
    str = str.split('').map(item=>item.toLocaleLowerCase()).filter(s=>reg.test(s)).join('')
    let right = str.length - 1, left = 0;
    while(left <= right){
        if(str[left] !== str[right]) return false
        left++
        right--
    }
    return true
}
// console.log(isPalindromeStr("A man, a plan, a canal: Panama"));