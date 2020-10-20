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

print(getStrResult(closest_int_same_bit_count, 7))
