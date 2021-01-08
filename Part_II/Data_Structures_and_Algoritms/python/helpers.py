class ListNode:
    def __init__(self, data = 0, next_node = None):
        self.data = data
        self.next = next_node

    def getData(self):
        next_data = self.next.getData() if self.next else []
        result = [self.data]
        result.extend(next_data)
        return result

def create_list(items):
    head = tail = ListNode()

    for i in range(items):
        tail.next = ListNode(i)
        tail = tail.next
    
    return head.next
