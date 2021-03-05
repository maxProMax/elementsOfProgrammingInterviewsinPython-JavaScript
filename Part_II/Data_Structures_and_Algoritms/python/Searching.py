import math
import collections
import operator
import random
import functools


def search_first_of_k(A, k):
    left, right, result = 0, len(A) - 1, -1

    while left <= right:
        mid = (left + right) // 2

        if A[mid] > k:
            right = mid - 1
        elif A[mid] == k:
            result = mid
            right = mid - 1
        else:
            left = mid + 1
    return result


# print('search_first_of_k', search_first_of_k([1, 2, 3, 4, 12, 15, 16], 12))


def search_entry_equal_to_its_index(A):
    left, right = 0, len(A) - 1

    while left <= right:
        mid = (left + right) // 2
        difference = A[mid] - mid

        if difference == 0:
            return mid
        elif difference > 0:
            right = mid - 1
        else:
            left = mid + 1

    return -1


# print('search_entry_equal_to_its_index',
#       search_entry_equal_to_its_index([-2, 0, 2, 3, 6, 7, 9]))

def search_smallest(A):
    left, right = 0, len(A) - 1

    while left < right:
        mid = (left + right) // 2
        if A[mid] > A[right]:
            left = mid + 1
        else:
            right = mid

    return left


# print('search_smallest', search_smallest(
#     [378, 478, 550, 631, 103, 203, 220, 234, 279, 368]))

def square_root(k):
    left, right = 0, k

    while left <= right:
        mid = (left + right) // 2
        mid_square = mid * mid

        if mid_square <= k:
            left = mid + 1
        else:
            right = mid - 1

    return left - 1


# print('square_root', square_root(300))

def square_root_1(x):
    left, right = (x, 1) if x < 1 else (0, x)

    while not math.isclose(left, right):
        mid = 0.5 * (left + right)
        mid_square = mid * mid

        if mid_square > x:
            right = mid
        else:
            left = mid

    return left


# print('square_root_1', square_root_1(25))

def matrix_search(A, x):
    row, col = 0, len(A[0]) - 1

    while row <= len(A) and col >= 0:
        if A[row][col] == x:
            return True
        elif A[row][col] < x:
            row += 1
        else:
            col -= 1

    return False


# print('matrix_search', matrix_search([
#     [-1, 2, 4, 4, 6],
#     [1, 5, 5, 9, 21],
#     [3, 6, 6, 9, 22],
#     [6, 8, 9, 12, 25]
# ], 8))

MinMax = collections.namedtuple('MinMax', ('smallest', 'largest'))


def find_min_max(A):
    def min_max(a, b):
        return MinMax(a, b) if a < b else MinMax(b, a)

    if len(A) <= 1:
        return min_max(A[0], A[0])

    global_min_max = min_max(A[0], A[1])

    for i in range(2, len(A) - 1, 2):
        local_min_max = min_max(A[i], A[i+1])
        global_min_max = MinMax(
            min(global_min_max.smallest, local_min_max.smallest),
            max(global_min_max.largest, local_min_max.largest)
        )

    if len(A) % 2:
        global_min_max = MinMax(
            min(global_min_max.smallest, A[-1]),
            max(global_min_max.largest, A[-1])
        )

    return global_min_max


# print('find_min_max', find_min_max([3, 2, 5, 1, 2, 4]))


def find_kth_largest(k, A):
    def find_kth(comp):
        def partition_around_pivot(left, right, pivot_idx):
            pivot_value = A[pivot_idx]
            new_pivot_idx = left
            A[pivot_idx], A[right] = A[right], A[pivot_idx]

            for i in range(left, right):
                if comp(A[i], pivot_value):
                    A[i], A[new_pivot_idx] = A[new_pivot_idx], A[i]
                    new_pivot_idx += 1

            A[right], A[new_pivot_idx] = A[new_pivot_idx], A[right]

            return new_pivot_idx

        left, right = 0, len(A) - 1

        while left <= right:
            pivot_idx = random.randint(left, right)
            new_pivot_idx = partition_around_pivot(left, right, pivot_idx)

            if new_pivot_idx == k - 1:
                return A[new_pivot_idx]
            elif new_pivot_idx > k - 1:
                right = new_pivot_idx - 1
            else:
                left = new_pivot_idx + 1

    return find_kth(operator.gt)


# print('find_kth_largest', find_kth_largest(3, [3, 1, -1, 2]))

def find_duplicate_missing(A):
    DuplicateAndMissing = collections.namedtuple(
        'DuplicateAndMissing', ('duplicate', 'missing'))

    miss_XOR_dup = functools.reduce(
        lambda v, i: v ^ i[0] ^ i[1], enumerate(A), 0)

    differ_bit, miss_or_dup = miss_XOR_dup & (~(miss_XOR_dup - 1)), 0

    for i, a in enumerate(A):
        if i & differ_bit:
            miss_or_dup ^= i

        if a & differ_bit:
            miss_or_dup ^= a

    if miss_or_dup in A:
        return DuplicateAndMissing(miss_or_dup, miss_or_dup ^ miss_XOR_dup)

    return DuplicateAndMissing(miss_or_dup ^ miss_XOR_dup, miss_or_dup)


'''
Comment
'''
print('find_duplicate_missing', find_duplicate_missing([5, 3, 0, 3, 1, 2]))
