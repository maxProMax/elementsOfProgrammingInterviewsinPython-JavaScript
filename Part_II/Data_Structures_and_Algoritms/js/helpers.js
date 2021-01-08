class ListNode {
    constructor(data = 0, nextNode = null) {
        this.data = data;
        this.next = nextNode;
    }

    getData() {
        const nextData = this.next ? this.next.getData() : [];
        return [this.data, ...nextData]
    }
}

function createList(items) {
    let head = tail = new ListNode();

    for (let i = 0; i < items; i++) {
        tail.next = new ListNode(i);
        tail = tail.next;
    }

    return head.next;
}

exports.ListNode = ListNode;
exports.createList = createList;