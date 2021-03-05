function searchFirstOfKey(A, k) {
    let left = 0;
    let right = A.length - 1;
    let result = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (A[mid] > k) {
            right = mid - 1;
        } else if (A[mid] === k) {
            result = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return result;
}

// console.log('searchFirstOfKey', searchFirstOfKey([1, 2, 3, 4, 12, 15, 16], 12));

function searchEntryEqualToitsIndex(A) {
    let left = 0;
    let right = A.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const difference = A[mid] - mid;

        if (difference == 0) {
            return mid;
        } else if (difference > 0) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return -1;
}

// console.log(
//     'searchEntryEqualToitsIndex',
//     searchEntryEqualToitsIndex([-2, 0, 2, 3, 6, 7, 9])
// );

function searchSmallest(A) {
    let left = 0;
    let right = A.length;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (A[mid] > A[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return left;
}

// console.log(
//     'searchSmallest',
//     searchSmallest([378, 478, 550, 631, 103, 203, 220, 234, 279, 368])
// );

function squareRoot(k) {
    let left = 0;
    let right = k;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midSquare = mid * mid;

        if (midSquare <= k) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return left - 1;
}

// console.log('squareRoot', squareRoot(300));

function squareRoot_1(k) {
    let [left, right] = k < 1 ? [k, 1] : [0, k];
    const isClose = (a, b) =>
        Math.abs(a - b) <=
        Math.max(1e-9 * Math.max(Math.abs(a), Math.abs(b)), 0);

    while (!isClose(left, right)) {
        const mid = 0.5 * (left + right);
        const midSquare = mid * mid;

        if (midSquare > k) {
            right = mid;
        } else {
            left = mid;
        }
    }

    return left;
}

// console.log('squareRoot_1', squareRoot_1(25));

function matrixSearch(A, k) {
    let row = 0;
    let col = A[0].length - 1;

    while (row <= A.length && col >= 0) {
        if (A[row][col] === k) {
            return true;
        } else if (A[row][col] < k) {
            row += 1;
        } else {
            col -= 1;
        }
    }

    return false;
}

// console.log(
//     'matrixSearch',
//     matrixSearch(
//         [
//             [-1, 2, 4, 4, 6],
//             [1, 5, 5, 9, 21],
//             [3, 6, 6, 9, 22],
//             [6, 8, 9, 12, 25]
//         ],
//         8
//     )
// );

function findMinMax(A) {
    const MinMax = (smallest, largest) => ({ smallest, largest });
    const minMax = (a, b) => (a < b ? MinMax(a, b) : MinMax(b, a));

    if (A.length <= 1) {
        return minMax(A[0], A[0]);
    }

    let globalMinMax = minMax(A[0], A[1]);

    for (let i = 2; i < A.length - 1; i += 2) {
        const localMinMax = minMax(A[i], A[i + 1]);

        globalMinMax = minMax(
            Math.min(globalMinMax.smallest, localMinMax.smallest),
            Math.max(globalMinMax.largest, localMinMax.largest)
        );
    }

    if (A.length % 2) {
        globalMinMax = minMax(
            Math.min(globalMinMax.smallest, ...A.slice(-1)),
            Math.max(globalMinMax.largest, ...A.slice(-1))
        );
    }

    return globalMinMax;
}

// console.log('findMinMax', findMinMax([3, 2, 5, 1, 2, 4]));

function findKthLargest(k, A) {
    function findKthLargest(comp) {
        function partitionAroundPivot(left, right, pivotIdx) {
            const pivotValue = A[pivotIdx];
            let newPivotIdx = left;
            [A[pivotIdx], A[right]] = [A[right], A[pivotIdx]];

            for (let i = left; i < right; i++) {
                if (comp(A[i], pivotValue)) {
                    [A[i], A[newPivotIdx]] = [A[newPivotIdx], A[i]];
                    newPivotIdx += 1;
                }
            }

            [A[right], A[newPivotIdx]] = [A[newPivotIdx], A[right]];

            return newPivotIdx;
        }

        let [left, right] = [0, A.length - 1];

        while (left <= right) {
            const pivotIdx = Math.ceil((right - left) * Math.random());
            const newPivotIdx = partitionAroundPivot(left, right, pivotIdx);

            if (newPivotIdx === k - 1) {
                return A[newPivotIdx];
            } else if (newPivotIdx > k - 1) {
                right = newPivotIdx - 1;
            } else {
                left = newPivotIdx + 1;
            }
        }
    }

    return findKthLargest((a, b) => a > b);
}

// console.log('findKthLargest', findKthLargest(3, [3, 1, -1, 2]));

function findDuplicateMissing(A) {
    const DuplicateAndMissing = (duplicate, missing) => ({
        duplicate,
        missing
    });
    const missXORDup = A.reduce((v, ...i) => v ^ i[0] ^ i[1], 0);
    const differBit = missXORDup & ~(missXORDup - 1);
    let missOrDup = 0;

    for (const [i, a] of Object.entries(A)) {
        if (i & differBit) {
            missOrDup = missOrDup ^ i;
        }

        if (a & differBit) {
            missOrDup = missOrDup ^ a;
        }
    }

    if (A.includes(missOrDup)) {
        return DuplicateAndMissing(missOrDup, missOrDup ^ missXORDup);
    }

    return DuplicateAndMissing(missOrDup ^ missXORDup, missOrDup);
}

console.log('findDuplicateMissing', findDuplicateMissing([5, 3, 0, 3, 1, 2]));
