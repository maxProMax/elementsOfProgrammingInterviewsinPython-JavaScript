from helpers import ListNode

def search_list(L, key):
    while L and L.data != key:
        L = L.next
    
    return L

def insert_after(node, new_node):
    new_node.next = node.next
    node.next = new_node

def delete_after(node):
    node.next = node.next.next

def merge_two_sorted_list(L1, L2):
    dummy_head = tail = ListNode()

    while L1 and L2:
        if L1.data > L2.data:
            tail.next = L2
            L2 = L2.next
        else:
            tail.next = L1
            L1 = L1.next
        tail = tail.next

    tail.next = L1 or L2
    return dummy_head.next

list_1 = ListNode(0, ListNode(1, ListNode(5)))
list_2 = ListNode(2, ListNode(3, ListNode(4)))
merged_list = merge_two_sorted_list(list_1, list_2)

# print(merged_list.getData())

def reverse_sublist(L, start, finish):
    dummy_head = sublist_head = ListNode(0, L)
    for _ in range(1, start):
        sublist_head = sublist_head.next

    sublist_iter = sublist_head.next
    
    for _ in range(finish - start):
        temp = sublist_iter.next
        sublist_iter.next = temp.next
        temp.next = sublist_head.next
        sublist_head.next = temp
    
    return dummy_head.next

list_node = ListNode(1, ListNode(2, ListNode(3, ListNode(4, ListNode(5, ListNode(6))))))
# print(reverse_sublist(list_node, 2,4).getData())

def has_cycle(head):
    def cycle_len(end):
        start = end
        step = 0

        while True:
            step += 1
            start = start.next
            if start is end:
                return step
    
    fast = slow = head
    while fast and fast.next and fast.next.next:
        slow = slow.next
        fast = fast.next.next

        if slow is fast:
            cycle_len_advanced_iter = head
            for _ in range(cycle_len(slow)):
                cycle_len_advanced_iter = cycle_len_advanced_iter.next

            it = head
            while it is not cycle_len_advanced_iter:
                it = it.next
                cycle_len_advanced_iter = cycle_len_advanced_iter.next
            return it
    return None

## create list

cycleList = [ListNode(i + 1) for i in range(6)]

for i in range(6):
    if i + 1 == len(cycleList):
        cycleList[i].next = cycleList[2]
    else:
        cycleList[i].next = cycleList[i + 1]

## 

# print('has_cycle', vars(has_cycle(cycleList[0])))

def has_cycle_1(head):
    fast = slow = head
    while fast and fast.next and fast.next.next:
        slow = slow.next
        fast = fast.next.next

        if slow is fast:
            slow = head
            while slow is not fast:
                slow = slow.next
                fast = fast.next
            return slow
    return None

# print('has_cycle_1', vars(has_cycle_1(cycleList[0])))

def overlapping_no_cycle_lists(L1, L2):
    def length(L):
        length = 0
        while L:
            L = L.next
            length += 1
        return length

    L1_len = length(L1)
    L2_len = length(L2)

    if L1_len > L2_len:
        temp = L2
        L2 = L1
        L1 = temp

    for _ in range(abs(L2_len - L1_len)):
        L2 = L2.next
    
    while L1 and L2 and L1 is not L2:
        L1 = L1.next
        L2 = L2.next
    return L1

overlappingList1 = [ListNode(i + 1) for i in range(3)]
overlappingList2 = [ListNode(i + 1) for i in range(6)]

for (i, node) in enumerate(overlappingList2):
    if i + 1 != len(overlappingList2):
        overlappingList2[i].next = overlappingList2[i + 1]

for (i, node) in enumerate(overlappingList1):
    if i + 1 == len(overlappingList1):
        overlappingList1[i].next = overlappingList2[3]
    else:
        overlappingList1[i].next = overlappingList1[i + 1]

overlappingList1 = overlappingList1[0]
overlappingList2 = overlappingList2[0]

# print('overlapping_no_cycle_lists', vars(overlapping_no_cycle_lists(overlappingList1, overlappingList2)))

def overlapping_lists(L1, L2):
    root1 = has_cycle(L1)
    root2 = has_cycle(L2)

    if not root1 and not root2:
        return overlapping_no_cycle_lists(L1, L2)
    elif (root1 and not root2) or (not root1 and root2):
        return None

    temp = root2
    while True:
        temp = temp.next
        if temp is root1 or temp is root2:
            break
    
    if temp is not root1:
        return None
    
    def distance(a, b):
        dis = 0
        while a is not b:
            a = a.next
            dis += 1
        return dis
    
    stem1_length = distance(L1, root1)
    stem2_length = distance(L2, root2)

    if stem1_length > stem2_length:
        temp = L1
        L1 = L2
        L2 = temp
        temp = root1
        root1 = root2
        root2 = temp

    for _ in range(abs(stem1_length - stem2_length)):
        L2 = L2.next
    
    while L1 is not L2 and L1 is not root1 and L2 is not root2:
        L1 = L1.next
        L2 = L2.next

    return L1 if L1 is L2 else root1

# print('overlapping_lists', vars(overlapping_lists(overlappingList1, overlappingList2)))

def deletion_from_list(node_to_delete):
    node_to_delete.data = node_to_delete.next.data
    node_to_delete.next = node_to_delete.next.next

def remove_kth_last(L, k):
    dummy_head = ListNode(0, L)
    first = dummy_head.next

    for _ in range(k):
        first = first.next
    
    second = dummy_head
    while first:
        first = first.next
        second = second.next
    
    second.next = second.next.next

    return dummy_head.next

def remove_duplicates(L):
    it = L

    while it:
        next_distinct = it.next

        while next_distinct and next_distinct.data == it.data:
            next_distinct = next_distinct.next
        
        it.next = next_distinct
        it = next_distinct

    return L

def cyclically_right_shift_list(L, k):
    if not L:
        return L

    tail = L
    n = 1

    while tail.next:
        tail = tail.next
        n += 1
    
    k %= n

    if n == 0:
        return L
    
    tail.next = L
    steps_to_new_head = n - k
    new_tail = tail

    while steps_to_new_head:
        new_tail = new_tail.next
        steps_to_new_head -= 1

    new_head = new_tail.next
    new_tail.next = None

    return new_head

def even_odd_merge(L):
    if not L:
        return L
    
    even_dummy_head = ListNode(0)
    odd_dummy_head = ListNode(0)
    tails = [even_dummy_head, odd_dummy_head]
    turn = 0

    while L:
        tails[turn].next = L
        L = L.next
        tails[turn] = tails[turn].next
        turn ^= 1
    
    tails[1].next = None
    tails[0].next = odd_dummy_head.next

    return even_dummy_head.next

def reverse_linked_list(L):
    dummy_head = L
    dummy_tail = None

    while dummy_head:
        temp = dummy_head.next
        dummy_head.next = dummy_tail
        dummy_tail = dummy_head

        dummy_head = temp
    
    return dummy_tail

def is_linked_list_a_palindrome(L):
    # Finds the second half of L
    slow = fast = L

    while fast and fast.next:
        fast, slow = fast.next.next, slow.next

    # Compare the first half and reversed second half list.
    first_half_iter, second_half_iter = L, reverse_linked_list(slow)
    
    while second_half_iter and first_half_iter:
        if second_half_iter.data != first_half_iter.data:
            return False
        second_half_iter = second_half_iter.next
        first_half_iter = first_half_iter.next
    return True

list_node_2 = ListNode(1, ListNode(2, ListNode(3, ListNode(3, ListNode(2, ListNode(1))))))
# print('is_linked_list_a_palindrome', is_linked_list_a_palindrome(list_node_2))

def list_pivoting(L, x):
    less_head = less_iter = ListNode()
    equal_head = equal_iter = ListNode()
    greater_head = greater_iter = ListNode()

    while L:
        if L.data < x:
            less_iter.next = L
            less_iter = less_iter.next
        elif L.data == x:
            equal_head.next = L
            equal_head = equal_head.next
        else:
            greater_head.next = L
            greater_head = greater_head.next

        L = L.next

    greater_iter.next = None
    equal_iter.next = greater_head.next
    less_iter.next = equal_head.next

    return less_head.next


def add_two_numbers(L1, L2):
    place_inter = dummy_head = ListNode()
    carry = 0
    while L1 and L2:
        val = carry + (L1.data if L1 else 0) + (L2.data if L2 else 0)
        L1 = L1.next if L1 else None
        L2 = L2.next if L2 else None
        place_inter.next = ListNode(val % 10)
        carry, place_inter = val // 10, place_inter.next
    return dummy_head.next