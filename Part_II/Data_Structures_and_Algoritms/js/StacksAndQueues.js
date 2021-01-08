const { createList } = require('./helpers');

function prinLinkedListInRevers(head) {
    const nodes = [];

    while (head) {
        nodes.push(head.data);
        head = head.next;
    }

    while (nodes.length) {
        console.log(nodes.pop());
    }
}

// const list1 = createList(5);
// prinLinkedListInRevers(list1);

class Stack {
    static createElementWithCachedMax(element, max) {
        return { element, max };
    }

    constructor() {
        this.elementWithCachedMax = [];
    }

    empty() {
        return !this.elementWithCachedMax.length;
    }

    max() {
        if (this.empty()) {
            throw Error('max(): emprt stack');
        }

        return this.elementWithCachedMax.slice(-1)[0].max;
    }

    pop() {
        if (this.empty()) {
            throw Error('pop(): emprt stack');
        }

        return this.elementWithCachedMax.pop().element;
    }

    push(x) {
        this.elementWithCachedMax.push(
            Stack.createElementWithCachedMax(
                x,
                this.empty() ? x : Math.max(x, this.max())
            )
        );
    }
}

// const stack_1 = new Stack();

// stack_1.push(1);
// stack_1.push(4);
// stack_1.push(2);

// console.log(stack_1.max());

class Stack2 {
    static createMaxWithCount(max, count) {
        return { max, count };
    }

    constructor() {
        this.element = [];
        this.cachedMaxWithCount = [];
    }

    empty() {
        return !this.element.length;
    }

    max() {
        if (this.empty()) {
            throw Error('max(): emprt stack');
        }

        return this.cachedMaxWithCount.slice(-1)[0].max;
    }

    pop(x) {
        if (this.empty()) {
            throw Error('pop(): emprt stack');
        }
        const popElement = this.element.pop(x);
        const currentMax = this.cachedMaxWithCount.slice(-1)[0].max;

        if (popElement == currentMax) {
            this.cachedMaxWithCount.slice(-1)[0].count -= 1;

            if (this.cachedMaxWithCount.slice(-1)[0].count === 0) {
                this.cachedMaxWithCount.pop();
            }
        }

        return popElement;
    }

    push(x) {
        this.element.push(x);

        if (!this.cachedMaxWithCount.length) {
            this.cachedMaxWithCount.push(Stack2.createMaxWithCount(x, 1));
        } else {
            const max = this.cachedMaxWithCount.slice(-1)[0].max;

            if (max === x) {
                this.cachedMaxWithCount.slice(-1)[0].count += 1;
            } else if (max < x) {
                this.cachedMaxWithCount.push(Stack2.createMaxWithCount(x, 1));
            }
        }
    }
}

// const stack_2 = new Stack2();

// stack_2.push(1);
// stack_2.push(4);
// stack_2.push(2);

// console.log(stack_2.max());

function evaluate(RPN_expression) {
    const intermediateResult = [];
    const DELIMITER = ',';
    const OPERATORS = {
        '+': (y, x) => x + y,
        '-': (y, x) => x - y,
        '*': (y, x) => x * y,
        '/': (y, x) => x / y
    };

    for (let token of RPN_expression.split(DELIMITER)) {
        if (token in OPERATORS) {
            intermediateResult.push(
                OPERATORS[token](
                    intermediateResult.pop(),
                    intermediateResult.pop()
                )
            );
        } else {
            intermediateResult.push(Number(token));
        }
    }

    return intermediateResult.pop();
}

// console.log('evaluate 3,4,+,2,/ = ', evaluate('3,4,+,2,/'));

function isWellFormated(str) {
    const leftChars = [];
    const lookup = {
        '(': ')',
        '{': '}',
        '[': ']'
    };

    for (let c of str.split('')) {
        if (lookup[c]) {
            leftChars.push(c);
        } else if (!leftChars.length || lookup[leftChars.pop()] !== c) {
            return false;
        }
    }

    return !leftChars.length;
}

// console.log('isWellFormated', isWellFormated('{}}[]'));

function shortEquivalentPath(path) {
    if (!path) {
        throw Error('Empty String');
    }

    const pathNames = [];

    if (path[0] === '/') {
        pathNames.push('/');
    }

    for (let token of path
        .split('/')
        .filter((path) => ![',', ''].includes(path))) {
        if (token === '..') {
            if (!pathNames.length || pathNames.slice(-1)[0] === '..') {
                pathNames.push(token);
            } else {
                if (pathNames.slice(-1)[0] === '/') {
                    throw Error('Error Path');
                }
                pathNames.pop();
            }
        } else {
            pathNames.push(token);
        }
    }

    return pathNames.join('/');
}

// console.log('shortEquivalentPath', shortEquivalentPath('root/a/../b/c/../b1/b11/b111/../b112'));

function examineBuildingsWithSunset(sequence) {
    const candidates = [];

    for (const [i, height] of sequence.entries()) {
        while (candidates.length && height >= candidates.slice(-1)[0].height) {
            candidates.pop();
        }

        candidates.push({ i, height });
    }

    return candidates.reverse().map(({ i }) => i);
}
// const buildings = [2,11,9,4,5,6,7,8];
// console.log('examineBuildingsWithSunset. List of indexes', examineBuildingsWithSunset(buildings));

class Queue {
    static SCALE_FACTOR = 2;

    constructor(capacity = 10) {
        this._entries = Array(capacity).fill(null);
        this._head = this._tail = this._numQueueElemets = 0;
    }

    enqueue(x) {
        if (this._entries.length === this._numQueueElemets) {
            this._head = 0;
            this._tail = this._numQueueElemets;
            this._entries = [
                ...this._entries.slice(this._head),
                ...this._entries.slice(0, this._head)
            ];

            this._entries = this._entries.concat(
                Array(
                    this._entries.length * Queue.SCALE_FACTOR -
                        this._entries.length
                ).fill(null)
            );
        }
        this._entries[this._tail] = x;
        this._tail = (this._tail + 1) % this._entries.length;
        this._numQueueElemets += 1;
    }

    dequeue() {
        if (!this._numQueueElemets) {
            throw Error('empty queue');
        }

        this._numQueueElemets -= 1;
        const ret = this._entries[this._head];
        this._head = (this._head + 1) % this._entries.length;
        return ret;
    }

    size() {
        return this._numQueueElemets;
    }
}

// const queue = new Queue(3);
// queue.enqueue(1);
// queue.enqueue(2);
// queue.enqueue(3);
// queue.enqueue(4);
// console.log("size", queue.size());
// console.log("dequeue", queue.dequeue());
// console.log("size", queue.size());

class Queue_3 {
    constructor() {
        this.enq = [];
        this.deq = [];
    }

    enqueue(x) {
        this.enq.push(x);
    }

    dequeue() {
        while (this.deq.length) {}
    }
}

class QueueWithMax {
    constructor() {
        this._entries = [];
        this._candidatesForMax = [];
    }

    enqueue(x) {
        this._entries.push(x);

        while (
            this._candidatesForMax.length &&
            this._candidatesForMax.slice(-1)[0] < x
        ) {
            this._candidatesForMax.pop();
        }

        this._candidatesForMax.push(x);
    }

    dequeue() {
        if (this._entries.length) {
            const result = this._entries.unshift();

            if (result === this._candidatesForMax[0]) {
                this._candidatesForMax.unshift();
            }
            return result;
        }

        throw new Error('empty queue');
    }

    max() {
        return this._candidatesForMax[0];
    }
}

// const queue = new QueueWithMax();

// queue.enqueue(1);
// queue.enqueue(2);
// queue.enqueue(3);
// queue.enqueue(4);

// console.log('max', queue.max());

// queue.dequeue();
// queue.enqueue(5);

// console.log('max', queue.max());

class QueueWithMax2 {
    constructor() {
        this._enqueue = new Stack2();
        this._dequeue = new Stack2();
    }

    enqueue(x) {
        this._enqueue.push(x);
    }

    dequeue() {
        if (this._dequeue.empty()) {
            while (!this._enqueue.empty()) {
                this._dequeue.push(this._enqueue.pop());
            }
        }

        if (!this._dequeue.empty()) {
            return this._dequeue.pop();
        }

        throw new Error('empty queue');
    }

    max() {
        if (!this._enqueue.empty()) {
            return this._dequeue.empty()
                ? this._enqueue.max()
                : Math.max(this._enqueue.max(), this._dequeue.max());
        }

        if (!this._dequeue.empty()) {
            return this._dequeue.max();
        }

        throw new Error('empty queue');
    }
}

const queue = new QueueWithMax2();

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);

console.log('max', queue.max());

queue.dequeue();
queue.enqueue(5);

console.log('max', queue.max());
