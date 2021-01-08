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

// console.log(logResult(closestIntSameBitCount, 7));

function logResult(fn, ...args) {
    return `${fn.name} - input=${args[0]}, inputBin=${(args[0]).toString(2)}. Result=${fn(...args)}`;
}

function multiply(x, y) {
    function add(a, b) {
        let runningSum = 0;
        let carryin = 0;
        let k = 1;
        let temp_a = a;
        let temp_b = b;

        while (temp_a || temp_b) {
            var ak = a & k;
            var bk = b & k;
            var carryout = (ak & bk) | (ak & carryin) | (bk & carryin);
            runningSum = runningSum | (ak ^ bk ^ carryin);
            carryin = carryout << 1;
            k = k << 1;
            temp_a = temp_a >> 1;
            temp_b = temp_b >> 1;
        }

        return runningSum | carryin;
    }

    let runningSum = 0;

    while (x) {
        if (x & 1) {
            runningSum = add(runningSum, y);
        }
        x = x >> 1;
        y = y << 1;
    }

    return runningSum;
}

// console.log('multiply', multiply(10, 5));

function divide(x, y) {
    let result = 0;
    const getBaseLog = (x, y) =>  Math.ceil(Math.log(y) / Math.log(x));
    let power = 30 - getBaseLog(2, y);

    let yPower = y << power;

    while (x >= y) {
        while (yPower > x) {
            yPower = yPower >> 1;
            power -= 1;
        }

        result += 1 << power;
        x -= yPower;
    }

    return result;
}

// console.log('divide', divide(500, 10));

function power(x, y) {
    var result = 1;
    var power = y;

    while (power) {
        if (power & 1) {
            result *= x;
        }
        x = x * x;
        power = power >> 1;
    }

    return result;
}

// console.log('power', power(2,10));

function reverse(x) {
    var xRemaining = x;
    var result = 0;

    while (xRemaining) {
        result = result * 10 + xRemaining % 10;
        xRemaining = Math.floor(xRemaining / 10)
    }

    return result;
}

// console.log('reverse', reverse(5432));