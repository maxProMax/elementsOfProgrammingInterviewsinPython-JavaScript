function countOfBits(x) {
    let numBits = 0;

    while (x) {
        numBits += x & 1;
        x = x >> 1;
    }

    return numBits;
}

console.log((num => `decimal - ${num}, binary - ${(num).toString(2)}, result - ${countOfBits(num)}`)(10));