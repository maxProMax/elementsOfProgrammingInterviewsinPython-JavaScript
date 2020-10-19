def count_of_bits(x):
    num_bits = 0
    while x:
        num_bits += x & 1
        x >>= 1
    return num_bits

print((lambda num: f'decimal - {num}, binary - {bin(num)}, result - {count_of_bits(num)}')(10))

def parity(x):
    result = 0
    while x:
        result ^= x & 1
        x >>= 1
    return result

print((lambda num: f'decimal - {num}, binary - {bin(num)}, is  - {parity(num)}')(10))