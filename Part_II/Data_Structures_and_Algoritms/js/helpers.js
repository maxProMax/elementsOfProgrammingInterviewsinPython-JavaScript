class ListNode {
    constructor(data = 0, nextNode = null) {
        this.data = data;
        this.next = nextNode;
    }

    getData() {
        const nextData = this.next ? this.next.getData() : [];
        return [this.data, ...nextData];
    }
}

function createList(items) {
    let head = (tail = new ListNode());

    for (let i = 0; i < items; i++) {
        tail.next = new ListNode(i);
        tail = tail.next;
    }

    return head.next;
}

class MinHeap {
    constructor() {
        this.heap = [null];
    }

    getMin() {
        return this.heap[1];
    }

    isItems() {
        return this.heap.length > 1;
    }

    getLen() {
        return this.heap.length;
    }

    getVal(index) {
        const node = this.heap[index];
        return node instanceof Array ? node[0] : node;
    }

    insert(node) {
        this.heap.push(node);

        const getVal = (index) =>
            node instanceof Array ? this.heap[index][0] : node;

        if (this.heap.length > 1) {
            let current = this.heap.length - 1;

            while (
                current > 1 &&
                this.getVal(Math.floor(current / 2)) > this.getVal(current)
            ) {
                [this.heap[Math.floor(current / 2)], this.heap[current]] = [
                    this.heap[current],
                    this.heap[Math.floor(current / 2)]
                ];
                current = Math.floor(current / 2);
            }
        }
    }

    remove() {
        /* Smallest element is at the index 1 in the heap array */
        let smallest = this.heap[1];

        /* When there are more than two elements in the array, we put the right most element at the first position
            and start comparing nodes with the child nodes
        */
        if (this.heap.length > 2) {
            this.heap[1] = this.heap[this.heap.length - 1];
            this.heap.splice(this.heap.length - 1);

            if (this.heap.length === 3) {
                if (this.getVal(1) > this.getVal(2)) {
                    [this.heap[1], this.heap[2]] = [this.heap[2], this.heap[1]];
                }
                return smallest;
            }

            let current = 1;
            let leftChildIndex = current * 2;
            let rightChildIndex = current * 2 + 1;

            while (
                this.heap[leftChildIndex] &&
                this.heap[rightChildIndex] &&
                (this.getVal(current) > this.getVal(leftChildIndex) ||
                    this.getVal(current) > this.getVal(rightChildIndex))
            ) {
                if (
                    this.getVal(leftChildIndex) < this.getVal(rightChildIndex)
                ) {
                    [this.heap[current], this.heap[leftChildIndex]] = [
                        this.heap[leftChildIndex],
                        this.heap[current]
                    ];
                    current = leftChildIndex;
                } else {
                    [this.heap[current], this.heap[rightChildIndex]] = [
                        this.heap[rightChildIndex],
                        this.heap[current]
                    ];
                    current = rightChildIndex;
                }

                leftChildIndex = current * 2;
                rightChildIndex = current * 2 + 1;
            }
        } else if (this.heap.length === 2) {
            /* If there are only two elements in the array, we directly splice out the first element */
            this.heap.splice(1, 1);
        } else {
            return null;
        }

        return smallest;
    }
}

exports.ListNode = ListNode;
exports.createList = createList;
exports.MinHeap = MinHeap;
