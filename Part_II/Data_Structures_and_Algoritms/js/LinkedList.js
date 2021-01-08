const {ListNode} = require('./helpers'); 
// class ListNode {
//     constructor(data = 0, nextNode = null) {
//         this.data = data;
//         this.next = nextNode;
//     }

//     getData() {
//         const nextData = this.next ? this.next.getData() : [];
//         return [this.data, ...nextData]
//     }
// }

function mergeTwoSortedLists(L1, L2) {
    let dummyHead = tail = new ListNode();

    while (L1 && L2) {
        if (L1.data > L2.data) {
            tail.next = L2;
            L2 = L2.next;
        } else {
            tail.next = L1;
            L1 = L1.next;
        }

        tail = tail.next;
    }

    tail.next = L1 || L2;
    return dummyHead.next;
}

const list1 = new ListNode(1, new ListNode(2, new ListNode(5)));
const list2 = new ListNode(3, new ListNode(4, new ListNode(6)));
const mergedList = mergeTwoSortedLists(list1, list2);

// console.log(mergedList.getData()) // -> [1, 2, 3, 4, 5, 6]

function reverseSublist(L, start, finish) {
    let dummyHead = sublistHead = new ListNode(0, L);
    for (let i = 1; i < start; i++) {
        sublistHead = sublistHead.next;
    }

    const sublistIter = sublistHead.next;

    for (let i = 0; i < finish - start; i++) {
        let temp = sublistIter.next;
        sublistIter.next = temp.next;
        temp.next = sublistHead.next;
        sublistHead.next = temp;
    }

    return dummyHead.next;
}

// console.log(reverseSublist(mergedList, 2, 4).getData()); // -> [ 1, 4, 3, 2, 5, 6 ]

function hasCycle(head) {
    function getCycleLen(end) {
        let step = 0;
        let start = end;

        while (true) {
            step += 1;
            start = start.next;

            if (start === end) {
                return step;
            }
        }
    }

    let fast = slow = head;

    while (fast && fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (fast === slow) {
            const cycleLen = getCycleLen(slow);
            let cycleLenAdvancedIter = head;

            for (var i = 0; i < cycleLen; i++) {
                cycleLenAdvancedIter = cycleLenAdvancedIter.next;
            }

            let it = head;
            
            while (it !== cycleLenAdvancedIter) {
                it = it.next;
                cycleLenAdvancedIter = cycleLenAdvancedIter.next;
            }

            return it;
        }
    }

    return null;
}

function hasCycle1(head) {
    let fast = slow = head;

    while (fast && fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (fast === slow) {
            let slow = head;
            
            while (slow !== fast) {
                slow = slow.next;
                fast = fast.next;
            }

            return slow;
        }
    }

    return null;
}

const createNodeArray = (count) => Array(count).fill(1).map((item, i) => new ListNode(i + 1));
const joinNodes = array => array.map((node, i, arr) => {
    node.next = arr[i + 1] || null;
    return node;
});

let cycleList = createNodeArray(6);

cycleList.forEach((node, i, arr) => {
    if (!arr[i + 1]) {
        node.next = arr[2]; // node ListNode(3)
    } else {
        node.next = arr[i + 1];
    }
});

// console.log('hasCycle', hasCycle(cycleList[0]))
// console.log('hasCycle1', hasCycle1(cycleList[0]))

function overlappingNoCycleLists(L1, L2) {
    function length(L) {
        let length = 0;
        
        while (L) {
            L = L.next;
            length += 1;
        }

        return length;
    }

    const L1Len = length(L1);
    const L2Len = length(L2);

    if (L1Len > L2Len) {
        let temp = L2;
        L2 = L1;
        L1 = temp;
    }

    for (var i = 0; i < Math.abs(L1Len - L2Len); i++) {
        L2 = L2.next;
    }

    while (L1 && L2 && L1 !== L2) {
        L1 = L1.next;
        L2 = L2.next;
    }

    return L1;
}

const overlappingL1 = joinNodes(createNodeArray(3));
const overlappingL2 = joinNodes(createNodeArray(6));

overlappingL1.slice(-1)[0].next = overlappingL2[2];

// console.log('overlappingNoCycleLists', overlappingNoCycleLists(overlappingL1[0], overlappingL2[0]))

function overlappingLists(L1, L2) {
    let root1 = hasCycle(L1);
    let root2 = hasCycle(L2);

    if (!root1 && !root2) {
        return overlappingNoCycleLists(L1, L2);
    } else if ((root1 && !root2) || (!root1 && root2)) {
        return null;
    }

    let temp = root2;

    while (true) {
        temp = temp.next;

        if (temp === root1 || temp === root2) {
            break;
        }
    }

    if (temp !== root1) {
        return null;
    }

    function distance(a, b) {
        let dis = 0;
        while (a !== b) {
            a = a.next;
            dis += 1;
        }

        return dis;
    }

    let stem1Length = distance(L1, root1);
    let stem2Length = distance(L2, root2);
    
    if (stem1Length > stem2Length) {
        let temp = L1;
        L1 = L2;
        L2 = temp;
        temp = root1;
        root1 = root2;
        root2 = temp;
    }

    for (var i = 0; i < Math.abs(stem1Length - stem2Length); i++) {
        L2 = L2.next;
    }

    while (L1 !== L2 || L1 !== root1 || L2 !== root2) {
        L1 = L1.next;
        L2 = L2.next;
    }

    return L1 === L2 ? L1 : root1; 
}

// console.log('overlappingLists', overlappingLists(overlappingL1[0], overlappingL2[0]));

function deletionFromList(nodeToDelete) {
    nodeToDelete.data = nodeToDelete.next.data
    nodeToDelete.next = nodeToDelete.next.next
}

function removeKthLast(L, k) {// k-th element from the end
    let dummyHead = new ListNode(0, L);
    let first = dummyHead.next;

    for (let i = 0; i < k; i++) {
        first = first.next;
    }

    let second = dummyHead;

    while (first) {
        first = first.next;
        second = second.next;
    }

    second.next = second.next.next;
    return dummyHead.next;
}
// console.log('removeKthLast 1', removeKthLast(overlappingL2[0], 1).getData());

function removeDuplicates(L) {
    var it = L;

    while (it) {
        var nextDistinct = it.next;

        while (nextDistinct && nextDistinct.data === it.data) {
            nextDistinct = nextDistinct.next;
        }

        it.next = nextDistinct.next;
        it = nextDistinct;
    }

    return L;
}

function cyclicallyRightShiftList(L, k) {
    if (!L) {
        return L;
    }

    var n = 1;
    var tail = L;

    while (tail.next) {
        tail = tail.next;
        n += 1;
    }

    k %= n;

    if (k === 0) {
        return L;
    }

    tail.next = L;
    var stepsToNewHead = n - k;
    var new_tail = L;

    while (stepsToNewHead) {
        stepsToNewHead -= 1;
        new_tail = new_tail.next;
    }

    var new_head = new_tail.next;
    new_tail.next = null;

    return new_head;
}

function evenOddMerge(L) {
    if (!L) {
        return L;
    }

    var evenDummyHead = new ListNode(0);
    var oddDummyHead = new ListNode(0);
    var tails = [evenDummyHead, oddDummyHead];
    var turn = 0;

    while (L) {
        tails[turn].next = L;
        L = L.next;
        tails[turn] = tails[turn].next;
        turn ^= 1;
    }
    
    tails[1].next = null;
    tails[0].next = oddDummyHead.next;
    
    return evenDummyHead.next;
}

function reverseLinkedList(L) {
    let dummyHead = L;
    let dummyTail = null;

    while (dummyHead) {
        const temp = dummyHead.next;
        dummyHead.next = dummyTail;
        dummyTail = dummyHead;

        dummyHead = temp;
    }

    return dummyTail;
}

function isLinkedListAPalindrome(L) {
    // Finds the second half of L
    let slow = fast = L;

    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
    }

    // Compare the first half and reversed second half list.
    let firstHalfIter = L;
    let seconfHalfIter = reverseLinkedList(slow);

    while (firstHalfIter && seconfHalfIter) {
        if (firstHalfIter.data != seconfHalfIter.data) {
            return false;
        }

        firstHalfIter = firstHalfIter.next;
        seconfHalfIter = seconfHalfIter.next;
    }

    return true;
}

const list3 = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(3, new ListNode(2, new ListNode(1))))));
// console.log('isLinkedListAPalindrome', isLinkedListAPalindrome(list3));

function listPivoting (L, x) {
    let lessHead = lessIter = ListNode();
    let equalHead = equalIter = ListNode();
    let greaterHead = greaterIter = ListNode();

    while (L) {
        if (L.data < x) {
            lessIter.next = L;
            lessIter = lessIter.next;
        } else if (L.data === x) {
            equalIter.next = L;
            equalIter = equalIter.next;
        } else {
            greaterIter.next = L;
            greaterIter = greaterIter.next;
        }

        L = L.next;
    }

    greaterIter.next = null;
    equalIter.next = greaterHead.next;
    lessIter.next = equalHead.next;

    return lessHead.next;
}

function addTwoNumbers(L1, L2) {
    let placeInter = dummyHead = ListNode();
    let curry = 0;

    while (L1 && L2) {
       val = curry + (L1 ? L1.data : 0) + (L2 ? L2.data : 0);
       L1 = L1 ? L1.next : null; 
       L2 = L2 ? L2.next : null;
       placeInter.next = ListNode(val % 10);
       placeInter = placeInter.next;
       curry = Math.floor(val / 10);
    }

    return dummyHead.next;
}