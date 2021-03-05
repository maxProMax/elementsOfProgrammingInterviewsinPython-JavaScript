const { MinHeap } = require('./helpers');

function* iter(array) {
    for (const item of array) {
        yield item;
    }
}

function mergeSortedArrays(sortedArrays) {
    const minHeap = new MinHeap();
    const sortedArrayIters = sortedArrays.map((array) => iter(array));

    for (const [i, it] of Object.entries(sortedArrayIters)) {
        const { value: firstElement } = it.next();

        if (firstElement !== undefined) {
            minHeap.insert([firstElement, i]);
        }
    }

    const result = [];

    while (minHeap.isItems()) {
        const [smallestEntry, i] = minHeap.remove();
        const smallestArrayIter = sortedArrayIters[i];

        result.push(smallestEntry);

        const { value: nextElement } = smallestArrayIter.next();

        if (nextElement !== undefined) {
            minHeap.insert([nextElement, i]);
        }
    }

    return result;
}

// console.log(
//     'mergeSortedArrays',
//     mergeSortedArrays([
//         [3, 5, 7],
//         [0, 6],
//         [0, 6, 28]
//     ])
// );

function sortIncreasingDecreasingArray(A) {
    const sortedSubarrays = [];
    const [INCREASING, DECREASING] = [0, 1];
    let subarraysType = INCREASING;
    let startIdx = 0;

    for (let i = 1; i < A.length + 1; i++) {
        if (
            i === A.length ||
            (A[i - 1] < A[i] && subarraysType === DECREASING) ||
            (A[i - 1] >= A[i] && subarraysType === INCREASING)
        ) {
            sortedSubarrays.push(
                subarraysType === INCREASING
                    ? A.slice(startIdx, i)
                    : A.slice(startIdx, i).reverse()
            );

            startIdx = i;
            subarraysType =
                subarraysType === INCREASING ? DECREASING : INCREASING;
        }
    }

    return mergeSortedArrays(sortedSubarrays);
}

// console.log(
//     'sortIncreasingDecreasingArray',
//     sortIncreasingDecreasingArray([
//         57,
//         131,
//         493,
//         294,
//         221,
//         339,
//         418,
//         452,
//         442,
//         190
//     ])
// );

function onlineMedian(sequence) {
    const minHeap = new MinHeap();
    const maxHeap = new MinHeap();
    const result = [];

    for (const x of sequence) {
        minHeap.insert(x);

        const lowest = minHeap.remove();

        maxHeap.insert(-lowest);

        if (maxHeap.getLen() > minHeap.getLen()) {
            minHeap.insert(-maxHeap.remove());
        }

        result.push(
            minHeap.getLen() === maxHeap.getLen()
                ? 0.5 * (minHeap.getMin() + Math.abs(maxHeap.getMin()))
                : minHeap.getMin()
        );
    }

    return result;
}

console.log('onlineMedian', onlineMedian([1, 0, 3, 5, 2, 0, 1]));

function kLargestInBinaryHeap(A, k) {
    if (k <= 0) {
        return [];
    }

    const candidateMaxHeap = new MinHeap();
    const result = [];

    candidateMaxHeap.insert([-A[0], 0]);

    for (; k > 0; k--) {
        const candidateIdx = candidateMaxHeap.getMin()[1];

        result.push(-candidateMaxHeap.remove()[0]);

        const leftChildIdx = 2 * candidateIdx + 1;
        if (leftChildIdx < A.length) {
            candidateMaxHeap.insert([-A[leftChildIdx], leftChildIdx]);
        }

        const rightChildIdx = 2 * candidateIdx + 2;
        if (rightChildIdx < A.length) {
            candidateMaxHeap.insert([-A[rightChildIdx], rightChildIdx]);
        }
    }

    return result;
}

console.log(
    'kLargestInBinaryHeap',
    kLargestInBinaryHeap([561, 314, 401, 28, 156, 359, 271, 11, 3], 3)
);
