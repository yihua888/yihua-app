export default {}

/**
 * 对于 JS 来说，数组长度大于 10 会采用快排，否则使用插入排序。
 * 选择插入排序是因为虽然时间复杂度很差，但是在数据 量很小的情况下和 O(N * logN) 相差无几，
 * 然而插入排序需要的常数时间很小，所以相对别的排序来说更快。
 */


/**
 * 冒泡：让当前的和下一个比，然后依据统一规则更换两个数的位置
 * @param {number[]} arr 
 */
const bubbleSort = arr => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i; j++) {
            arr[j] > arr[j + 1] && ([arr[j], arr[j + 1]] = [arr[j + 1], arr[j]])
        }
    }
    return arr
}
// console.log(bubbleSort([1,5,4,3,2]));

/**
 * 快排：将数组一步步分解为左（小）中 右（大），这样分到最小的时候就合并变成了左 右都进行了排序，再合并。
 * @param {number[]} arr 
 * @returns {number[]}
 */
const quickSort = arr => {
    if (arr.length <= 1) return arr
    const left = [], right = [], mid = arr.pop();
    arr.forEach(num => {
        if (num > mid) {
            right.push(num)
        } else {
            left.push(num)
        }
    })

    return quickSort(left).concat(mid, quickSort(right))
}
// console.log(quickSort([1,5,4,3,2]));

/**
 * 插入：将当前元素与前面已有顺序的最后一个进行比较，然后看是否插入，如果插入则需要插入到最合适的位置，使得插入后依然有序
 * @param {number[]} arr 
 * @returns {number[]}
 */
const insertSort = arr => {
    for (let i = 1; i < arr.length; i++) {
        let j = i - 1
        if (arr[i] < arr[j]) {
            // 把i插入前面的位置
            let temp = arr[i]
            while (j >= 0 && arr[j] > temp) {
                arr[j + 1] = arr[j]
                j--
            }
            arr[j + 1] = temp
        }
    }
    return arr
}
// console.log(insertSort([1,5,4,3,2]));

/**
 * 希尔排序:
 * @param {number[]} arr 
 * @returns {number[]}
 */
const hillSort = arr => {
    let len = arr.length;
    for (let gap = parseInt(len >> 1); gap >= 1; gap = parseInt(gap >> 1)) {
        for (let i = gap; i < len; i++) {
            if (arr[i] < arr[i - gap]) {
                let temp = arr[i];
                let j = i - gap;
                while (j >= 0 && arr[j] > temp) {
                    arr[j + gap] = arr[j];
                    j -= gap;
                }
                arr[j + gap] = temp;
            }
        }
    }
    return arr;
}


/**
 * 选择排序
 * @param {number[]} arr 
 * @returns {number[]}
 */
function selectSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let min = Math.min(...arr.slice(i));
        let index = arr.indexOf(min);
        [arr[i], arr[index]] = [arr[index], arr[i]];
    }
    return arr;
}

//-----------------------------------------------堆排序-----------------------------------------------------

function adjustMaxHeap(heap, head, heapSize) {
    let temp = heap[head];
    let child = head * 2 + 1;
    while (child < heapSize) {
        if (child + 1 < heapSize && heap[child] < heap[child + 1]) child++;
        if (heap[head] < heap[child]) {
            heap[head] = heap[child];
            head = child;
            child = head * 2 + 1;
        } else break;
        heap[head] = temp;
    }
}

function buildHeap(heap) {
    for (let i = (heap.length - 1) >> 1; i >= 0; i--) {
        adjustMaxHeap(heap, i, heap.length);
    }
}

/**
 * 堆排序
 * @param {*} arr 
 * @returns 
 */
function heapSort(arr) {
    buildHeap(arr);
    for (let i = arr.length - 1; i > 0; i--) {
        [arr[i], arr[0]] = [arr[0], arr[i]];
        adjustMaxHeap(arr, 0, i);
    }
    return arr;
}

//-----------------------------------------------归并排序-----------------------------------------------------
function MergeSort(arr, left, right) {
    if (left >= right) return;
    let mid = Math.floor((right - left) >> 1) + left;
    MergeSort(arr, left, mid);
    MergeSort(arr, mid + 1, right);
    Merge(arr, left, mid, right);
    return arr;
}

function Merge(arr, left, mid, right) {
    let temp = [], i = 0;
    let p1 = left, p2 = mid + 1;
    while (p1 <= mid && p2 <= right) {
        arr[p1] <= arr[p2] ? temp[i++] = arr[p1++] : temp[i++] = arr[p2++];
    }
    while (p1 <= mid) {
        temp[i++] = arr[p1++];
    }
    while (p2 <= right) {
        temp[i++] = arr[p2++];
    }
    for (let i = 0; i < temp.length; i++) {
        arr[i + left] = temp[i];
    }
}

/**
 * 桶排序
 * @param {*} arr 
 * @param {*} arrDomain 
 * @param {*} gropSize 
 * @returns 
 */
function radixSort(arr, arrDomain, gropSize) {
    let data = [];
    for (let i = 0; i < arr.length; i++) data.push([]);
    for (let i = 0; i < arr.length; i++) {
        data[Math.floor(parseInt(arr[i] / gropSize)) + 1].push(arr[i]);
    }
    for (let i = 0; i < data.length; i++) {
        quickSort(data[i]);
    }
    return data.flat(Infinity);
}


function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

/**
 * 排序链表
 * @param {ListNode} head
 * @return {ListNode}
 */
const sortList = function (head) {
    /**
     * @param {ListNode} left 
     * @param {ListNode} right 
     */
    const mergeList = (left, right) => {
        // 合成有序的新的链表
        const rst = new ListNode(0)
        let pre = rst
        while(left && right){
            if(left.val <= right.val){
                pre.next = left
                left = left.next
            }else{
                pre.next = right
                right = right.next
            }
            // 移动指针
            pre = pre.next
        }
        // 把后续的接上
        pre.next = left ? left : right
        return rst.next
    }

    /**
     * @param {ListNode} node 
     * @returns {ListNode}
     */
    const mergeSort = (node) => {
        if (!node || !node.next) return node
        //找中间，快指针走两个，正常指针走一步    
        let mid = node
        let fast = node.next
        while (fast && fast.next) {
            fast = fast.next.next
            mid = mid.next
        }
        // 找到了中间
        const right = mid.next
        // 断开链接
        mid.next = null
        const left = node
        return mergeList(mergeSort(left),mergeSort(right))
    }

    return mergeSort(head)
};

const arr = [2, 5, 4, 6, 3, 1]
function createListNode(arr) {
    const node = new ListNode(0)
    let pre = node
    arr.forEach(item => {
        pre.next = new ListNode(item)
        pre = pre.next
    })
    return node.next
}

// const nodeList = createListNode(arr)
// console.log(sortList(nodeList));

/**
 * 逆序列
 * @param {number[]} nums 
 * @returns {number}
 */
const InversePairs = nums => {
    let count = 0

    /**
     * @param {number[]} left 
     * @param {number[]} right 
     * @returns {number[]}
     */
    const merge = (left,right) => {
        const res = [] , leftLen = left.length , rightLen = right.length ;
        let leftIndex = 0 , rightIndex = 0;
        while(leftIndex < leftLen && rightIndex < rightLen){
            if(left[leftIndex] <= right[rightIndex]){
                res.push(left[leftIndex])
                leftIndex++
            }else{
                res.push(right[rightIndex])
                rightIndex++
                //按理说left中所有元素应该小于等于right中所有元素，此时大于，说明当前right与当前left后续所有的子元素形成逆序列
                count += leftLen - leftIndex
            }
        }
        return leftIndex === leftLen ? res.concat(right.slice(rightIndex)) : res.concat(left.slice(leftIndex))
    }
    
    /**
     * @param {number[]} arr 
     * @returns {number[]}
     */
    const mergeSort = arr => {
        if(arr.length < 2) return arr
        const mid = arr.length >> 1
        return merge(mergeSort(arr.slice(0,mid)),mergeSort(arr.slice(mid)))

    }
    mergeSort(nums)
    return count
}

// console.log(InversePairs([7,6,5,4,3,2,1]));