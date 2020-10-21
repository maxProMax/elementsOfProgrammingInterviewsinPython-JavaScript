import math

getStrResult = lambda fn, *args: f'{fn.__name__} - input={args[0]}, input_bin={bin(args[0])}. Result={fn(*args)}'

def count_of_bits(x):
    num_bits = 0
    while x:
        num_bits += x & 1
        x >>= 1
    return num_bits

# print(getStrResult(count_of_bits, 10))

def parity(x):
    result = 0
    while x:
        result ^= x & 1
        x >>= 1
    return result

# print(getStrResult(parity, 10))

def swap_bits(x, i, j):
    if (x >> i) & 1 != (x >> j) & 1:
        bit_mask = (1 << i) | (1 << j)
        x ^= bit_mask
    return x

# print(getStrResult(swap_bits, 73, 1, 6))

def closest_int_same_bit_count(x):
    NUM_UNSIGNED_BITS = 64
    for i in range(NUM_UNSIGNED_BITS - 1):
        if (x >> i) & 1 != (x >> (i + 1)) & 1:
            x ^= (1 << i) | (1 << (i + 1))
            return x
    raise ValueError('All bits are 0 or 1')

# print(getStrResult(closest_int_same_bit_count, 7))

def multiply(x,y):
    def add(a, b):
        running_sum = 0
        carryin = 0
        k = 1
        temp_a = a
        temp_b = b

        while temp_a or temp_b:
            ak = a & k
            bk = b & k
            carryout = (ak & bk) | (ak & carryin) | (bk & carryin)
            running_sum |= ak ^ bk ^ carryin
            carryin = carryout << 1
            k = k << 1
            temp_a = temp_a >> 1
            temp_b = temp_b >> 1

        return running_sum | carryin

    running_sum = 0
    while x:
        if x & 1:
            print(running_sum, y, add(running_sum, y))
            running_sum = add(running_sum, y)

        x = x >> 1
        y = y << 1

    return running_sum

# print('multiply', multiply(10, 5))

def divide(x, y):
    result = 0
    power = 32
    y_power = y << power

    while x >= y:
        while y_power > x:
            y_power >>= 1
            power -= 1
        result += 1 << power
        x -= y_power
    return result

# print('divide', divide(29, 2))

def power(x, y):
    result = 1
    power = y

    while power:
        if power & 1:
            result *= x

        x = x * x
        power = power >> 1

    return result

# print(power(2,10))

def reverse(x):
    result = 0
    x_remaining = x

    while x_remaining:
        result = result * 10 + x_remaining % 10
        x_remaining = math.floor(x_remaining / 10)

    return -result if x < 0 else result

# print('reverse', reverse(5432))