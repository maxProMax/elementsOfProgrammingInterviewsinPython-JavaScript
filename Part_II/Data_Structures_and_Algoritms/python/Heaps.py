import heapq
import itertools


def merge_sorted_arrays(sorted_arrays):
    min_heap = []
    sorted_arrays_iters = [iter(x) for x in sorted_arrays]

    for i, it in enumerate(sorted_arrays_iters):
        first_element = next(it, None)

        if first_element is not None:
            heapq.heappush(min_heap, (first_element, i))

    result = []

    while min_heap:
        smallest_entry, smallest_array_i = heapq.heappop(min_heap)
        smallest_array_iter = sorted_arrays_iters[smallest_array_i]
        result.append(smallest_entry)
        next_element = next(smallest_array_iter, None)

        if next_element is not None:
            heapq.heappush(min_heap, (next_element, smallest_array_i))

    return result


# print('merge_sorted_arrays', merge_sorted_arrays(
#     [[3, 5, 7], [0, 6], [0, 6, 28]]))


def sort_increasing_decreasing_array(A):
    sorted_subarrays = []
    INCREACSING, DECREASING = range(2)
    subarrays_type = INCREACSING

    start_idx = 0

    for i in range(1, len(A) + 1):
        if (i == len(A)
            or (A[i - 1] < A[i] and subarrays_type == DECREASING)
                or (A[i - 1] >= A[i] and subarrays_type == INCREACSING)):
            sorted_subarrays.append(
                A[start_idx:i] if subarrays_type == INCREACSING else A[i-1:start_idx - 1:-1])
            start_idx = i
            subarrays_type = DECREASING if subarrays_type == INCREACSING else INCREACSING

    return merge_sorted_arrays(sorted_subarrays)


# print('sort_increasing_decreasing_array', sort_increasing_decreasing_array([
#     57, 131, 493, 294, 221, 339, 418, 452, 442, 190
# ]))

def sort_aproximately_sorted_array(sequence, k):
    result = []
    min_heap = []

    for x in itertools.islice(sequence, k):
        heapq.heappush(min_heap, x)

    for x in sequence[k:]:
        smallest = heapq.heappushpop(min_heap, x)
        result.append(smallest)

    while min_heap:
        smallest = heapq.heappop(min_heap)
        result.append(smallest)

    return result


# print('sort_aproximately_sorted_array',
#       sort_aproximately_sorted_array([3, 1, 2, 4, 5], 3))


def find_closest_k_stars(stars, k):
    max_heap = []

    for star in stars:
        heapq.heappush(max_heap, (-star.get('distance'), star))
    if len(max_heap) == k + 1:
        heapq.heappop(max_heap)

    return [s[1] for s in heapq.nlargest(k, max_heap)]


# print('find_closest_k_stars', find_closest_k_stars([{'distance': 1}, {
#       'distance': 2}, {'distance': 3}, {'distance': 4}], 2))

def online_median(sequence):
    min_heap = []
    max_heap = []
    result = []

    for x in sequence:
        heapq.heappush(max_heap, -heapq.heappushpop(min_heap, x))

        if len(max_heap) > len(min_heap):
            heapq.heappush(min_heap, -heapq.heappop(max_heap))

        print(min_heap, max_heap)

        result.append(0.5 * (max_heap[0] + min_heap[0])
                      if len(max_heap) == len(min_heap) else min_heap[0])

    return result


# print('online_median', online_median([1, 0, 3, 5, 2, 0, 1]))


def k_largest_in_binary_heap(A, k):
    if k <= 0:
        return []

    candidate_max_heap = []
    candidate_max_heap.append((-A[0], 0))
    result = []

    for _ in range(k):
        candidate_idx = candidate_max_heap[0][1]
        result.append(-heapq.heappop(candidate_max_heap)[0])

        left_child_idx = 2 * candidate_idx + 1
        if left_child_idx < len(A):
            heapq.heappush(candidate_max_heap,
                           (-A[left_child_idx], left_child_idx))

        right_child_idx = 2 * candidate_idx + 2
        if right_child_idx < len(A):
            heapq.heappush(candidate_max_heap,
                           (-A[right_child_idx], right_child_idx))

    return result


print('k_largest_in_binary_heap', k_largest_in_binary_heap(
    [561, 314, 401, 28, 156, 359, 271, 11, 3], 3))
