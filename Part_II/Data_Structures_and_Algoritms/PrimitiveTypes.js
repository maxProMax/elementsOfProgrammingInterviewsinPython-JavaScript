function countOfBits(x) {
    let numBits = 0;

    while (x) {
        numBits += x & 1;
        x = x >> 1;
    }

    return numBits;
}

// console.log(logResult(countOfBits, 10));

function parity(x) {
    let result = 0;

    while (x) {
        result ^= x & 1;
        x = x >> 1;
    }

    return result;
}

// console.log(logResult(parity, 10));

function swapBits(x, i, j) {
    if (((x >> i) & 1) != ((x >> j) & 1)) {
        const bitMask = (1 << i) | (1 << j);
        x = x ^ bitMask;
    }

    return x;
}
// console.log(logResult(swapBits, 73, 1, 6));

function closestIntSameBitCount(x) {
    const NUM_UNSIGNED_BITS = 32;

    for (var i = 0; i < NUM_UNSIGNED_BITS; i++) {
        if (((x >> i) & 1) != ((x >> (i + 1)) & 1)) {
            x = x ^ ((1 << i) | (1 << (i + 1)));
            return x;
        }
    }

    throw 'All bits are 0 or 1';
}

console.log(logResult(closestIntSameBitCount, 7));

function logResult(fn, ...args) {
    return `${fn.name} - input=${args[0]}, inputBin=${(args[0]).toString(2)}. Result=${fn(...args)}`;
}