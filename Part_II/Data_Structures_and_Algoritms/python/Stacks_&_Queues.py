from collections import namedtuple, deque
from helpers import create_list

list_1 = create_list(5)


def print_linked_list_in_revers(head):
    nodes = []
    while head:
        nodes.append(head.data)
        head = head.next

    while nodes:
        print(nodes.pop())

# print('print_linked_list_in_revers', print_linked_list_in_revers(list_1))


class Stack:
    ElementWithCachedMax = namedtuple(
        'ElementWithCachedMax', ('element', 'max'))

    def __init__(self):
        self._element_with_cached_max = []

    def empty(self):
        return len(self._element_with_cached_max) == 0

    def max(self):
        if self.empty():
            raise IndentationError('max(): empty stack')
        return self._element_with_cached_max[-1].max

    def pop(self):
        if self.empty():
            raise IndentationError('pop(): empty stack')
        return self._element_with_cached_max.pop().element

    def push(self, x):
        self._element_with_cached_max.append(
            self.ElementWithCachedMax(
                x, x if self.empty() else max(x, self.max()))
        )


# stack_1 = Stack()

# stack_1.push(1)
# stack_1.push(4)
# stack_1.push(2)

# print(stack_1.max())

class Stack2:
    class MaxWithCount:
        def __init__(self, max, count):
            self.max, self.count = max, count

    def __init__(self):
        self._element = []
        self._cached_max_with_count = []

    def empty(self):
        return len(self._element) == 0

    def max(self):
        if self.empty():
            raise IndentationError('max(): empty stack')
        return self._cached_max_with_count[-1].max

    def pop(self):
        if self.empty():
            raise IndentationError('pop(): empty stack')

        pop_element = self._element.pop()
        current_max = self._cached_max_with_count[-1].max

        if pop_element == current_max:
            self._cached_max_with_count[-1].count -= 1

            if self._cached_max_with_count[-1].count == 0:
                self._cached_max_with_count.pop()

        return pop_element

    def push(self, x):
        self._element.append(x)

        if len(self._cached_max_with_count) == 0:
            self._cached_max_with_count.append(self.MaxWithCount(x, 1))
        else:
            current_max = self._cached_max_with_count[-1].max
            if current_max == x:
                self._cached_max_with_count[-1].count += 1
            elif x > current_max:
                self._cached_max_with_count.append(self.MaxWithCount(x, 1))


# stack_2 = Stack2()

# stack_2.push(1)
# stack_2.push(4)
# stack_2.push(2)
# stack_2.pop()

# print('Stack2 max', stack_2.max())


def evaluate(RPN_expression):
    intermediate_result = []
    DELIMITER = ','
    OPERATORS = {
        '+': lambda y, x: x + y,
        '-': lambda y, x: x - y,
        '*': lambda y, x: x * y,
        '/': lambda y, x: x / y
    }

    for token in RPN_expression.split(DELIMITER):
        if token in OPERATORS:
            intermediate_result.append(
                OPERATORS[token](
                    intermediate_result.pop(),
                    intermediate_result.pop()
                )
            )
        else:
            intermediate_result.append(int(token))

    return intermediate_result[-1]

# print('evaluate 3,4,+,2,/ = ', evaluate('3,4,+,2,/'))


def is_well_formated(s):
    left_chars = []
    lookup = {
        '(': ')',
        '{': '}',
        '[]': ']'
    }

    for c in s:
        if c in lookup:
            left_chars.append(c)
        elif not left_chars or lookup[left_chars.pop()] != c:
            return False

    return not left_chars

# print('is_well_formated', is_well_formated('(){)'))


def short_equivalent_path(path):
    if not path:
        raise ValueError('Empty string')

    path_names = []

    if path[0] == '/':
        path_names.append('/')

    for token in (token for token in path.split('/') if token not in ['.', '']):
        if token == '..':
            if not path_names or path_names[-1] == '..':
                path_names.append(token)
            else:
                if path_names[-1] == '/':
                    raise ValueError('Path error')
                path_names.pop()
        else:
            path_names.append(token)

    result = '/'.join(path_names)

    return result[result.startswith('//'):]

# print('short_equivalent_path', short_equivalent_path('root/a/../b/c/../b1/b11/b111/../b112'))


def examine_buildings_with_sunset(sequence):
    BuildingWithHeight = namedtuple('BuildingWithHeight', ('id', 'height'))

    candidates = []

    for building_idx, building_height in enumerate(sequence):
        while candidates and building_height >= candidates[-1].height:
            candidates.pop()

        candidates.append(BuildingWithHeight(building_idx, building_height))

    return [candidat.id for candidat in reversed(candidates)]

# buildings = [2,11,9,4,5,6,7,8]
# print('examine_buildings_with_sunset. List of indexes', examine_buildings_with_sunset(buildings))

# QUEUE


class Queue:
    def __init__(self):
        self.__data__ = deque()

    def enqueue(self, x):
        self.__data__.append(x)

    def dequeue(self):
        self.__data__.popleft()

    def max(self):
        return max(self.__data__)


class Queue_2:
    SCALE_FACTOR = 2

    def __init__(self, capacity=10):
        self._entries = [None] * capacity
        self._head = self._tail = self._num_queue_elemets = 0

    def enqueue(self, x):
        if self._num_queue_elemets == len(self._entries):
            self._entries = (
                self._entries[self._head:] + self._entries[:self._head]
            )
            self._head, self._tail = 0, self._num_queue_elemets
            self._entries += [None] * (len(self._entries)
                                       * Queue_2.SCALE_FACTOR - len(self._entries))
        self._entries[self._tail] = x
        self._tail = (self._tail + 1) % len(self._entries)
        self._num_queue_elemets += 1

    def dequeue(self):
        if not self._num_queue_elemets:
            raise IndexError('empty queue')
        self._num_queue_elemets -= 1
        ret = self._entries[self._head]
        self._head = self._head + 1 % len(self._entries)

        return ret

    def size(self):
        return self._num_queue_elemets


# queue = Queue_2(3)

# queue.enqueue(1)
# queue.enqueue(2)
# queue.enqueue(3)
# queue.enqueue(4)
# print('size', queue.size())
# print('dequeue', queue.dequeue())
# print('size', queue.size())


class Queue_3:
    def __init__(self):
        self.enq, self.deq = [], []

    def enqueue(self, x):
        self.enq.append(x)

    def dequeue(self):
        if not self.deq:
            while self.enq:
                self.deq.append(self.enq.pop())

        if not self.deq:
            raise IndexError('empty queue')

        return self.deq.pop()


# queue = Queue_3()
# queue.enqueue(1)
# queue.enqueue(2)
# queue.enqueue(3)
# queue.enqueue(4)
# print('dequeue', queue.dequeue())
# queue.enqueue(5)
# print('dequeue', queue.dequeue())


class QueueWithMax:

    def __init__(self):
        self._entries = deque()
        self._candiadtes_for_max = deque()

    def enqueue(self, x):
        self._entries.append(x)

        while self._candiadtes_for_max and self._candiadtes_for_max[-1] < x:
            self._candiadtes_for_max.pop()

        self._candiadtes_for_max.append(x)

    def dequeue(self):
        if self._entries:
            result = self._entries.popleft()

            if result == self._candiadtes_for_max[0]:
                self._candiadtes_for_max.popleft()

            return result
        raise IndexError('empty queue')

    def max(self):
        if self._candiadtes_for_max:
            return self._candiadtes_for_max[0]
        raise IndexError('empty queue')


# queue = QueueWithMax()

# queue.enqueue(1)
# queue.enqueue(2)
# queue.enqueue(3)
# queue.enqueue(4)

# print('max', queue.max())

# queue.dequeue()
# queue.enqueue(5)

# print('max', queue.max())


class QueueWithMax_2:
    def __init__(self):
        self._enqueue = Stack2()
        self._dequeue = Stack2()

    def enqueue(self, x):
        self._enqueue.push(x)

    def dequeue(self):
        if self._dequeue.empty():
            while not self._enqueue.empty():
                self._dequeue.push(self._enqueue.pop())

        if not self._dequeue.empty():
            return self._dequeue.pop()

        raise IndexError('empty queue')

    def max(self):
        if not self._enqueue.empty():
            return self._enqueue.max() if self._dequeue.empty() else max(
                self._enqueue.max(),
                self._dequeue.max()
            )
        if not self._dequeue.empty():
            return self._dequeue.max()

        raise IndexError('empty queue')


# queue = QueueWithMax_2()

# queue.enqueue(1)
# queue.enqueue(2)
# queue.enqueue(3)
# queue.enqueue(4)

# print('max', queue.max())

# queue.dequeue()
# queue.enqueue(5)

# print('max', queue.max())
