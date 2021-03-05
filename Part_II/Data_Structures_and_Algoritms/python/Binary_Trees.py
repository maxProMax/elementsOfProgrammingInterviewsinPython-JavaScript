from collections import namedtuple


def create_binary_tree(nodes):
    tree_root = None

    def add_node(node, root):
        (data, value) = node

        def get_new_node(parent=None):
            return dict(data=data, value=value, size=0, parent=parent)

        if not root:
            return get_new_node()

        tree_side = 'left' if root['value'] > value else 'right'

        root['size'] += 1
        root[tree_side] = add_node(node, root.get(tree_side)) if root.get(
            tree_side) else get_new_node(root)

        return root

    for node in nodes:
        tree_root = add_node(node, tree_root)

    return tree_root


tree = create_binary_tree(
    [('A', 9), ('B', 5), ('C', 3), ('D', 1), ('E', 0), ('F', 2), ('G', 4), ('H', 7), ('I', 6), ('J', 8), ('K', 13), ('O', 14), ('L', 11), ('M', 10),  ('N', 12)])

# print(tree)


def is_balanced_binary_tree(tree):
    BalancedStatusWithHeight = namedtuple(
        'BalancedStatusWithHeight', ('balanced', 'height'))

    def check_balanced(tree):
        if not tree:
            return BalancedStatusWithHeight(True, -1)

        left_result = check_balanced(tree.get('left'))

        if not left_result.balanced:
            return BalancedStatusWithHeight(False, 0)

        right_result = check_balanced(tree.get('right'))

        if not right_result.balanced:
            return BalancedStatusWithHeight(False, 0)

        is_balanced = abs(left_result.height - right_result.height) <= 1
        height = max(left_result.height, right_result.height) + 1

        return BalancedStatusWithHeight(is_balanced, height)

    return check_balanced(tree).balanced


# print('is_balanced_binary_tree', is_balanced_binary_tree(tree))

def is_symmetric(tree):
    def check_symmetric(subtree_0, subtree_1):
        if not subtree_0 and not subtree_1:
            return True
        elif subtree_0 and subtree_1:
            return (subtree_0['value'] == subtree_1['value']
                    and check_symmetric(subtree_0.get('left'), subtree_1.get('right'))
                    and check_symmetric(subtree_0.get('right'), subtree_1.get('left')))

        return False

    return not tree or check_symmetric(tree.get('left'), tree.get('right'))


symmetric_tree = create_binary_tree([('A', 314)])

symmetric_tree_left = create_binary_tree([('B', 6)])
symmetric_tree_right = create_binary_tree([('E', 6)])

symmetric_tree_left['right'] = create_binary_tree([('C', 2)])
symmetric_tree_right['left'] = create_binary_tree([('F', 2)])
symmetric_tree['left'] = symmetric_tree_left
symmetric_tree['right'] = symmetric_tree_right

# print('is_symmetric', is_symmetric(symmetric_tree))


def lca(tree, node0, node1):
    Status = namedtuple('Status', ('num_target_ancestor', 'ancestor'))

    def lca_helper(tree, node0, node1):
        if not tree:
            return Status(0, None)

        left_result = lca_helper(tree.get('left'), node0, node1)
        if left_result.num_target_ancestor == 2:
            return left_result

        right_result = lca_helper(tree.get('right'), node0, node1)
        if right_result.num_target_ancestor == 2:
            return right_result

        num_target_node = (
            left_result.num_target_ancestor + right_result.num_target_ancestor +
            (1 if tree['data'] == node0['data'] else 0) +
            (1 if tree['data'] == node1['data'] else 0)
        )

        return Status(num_target_node, tree if num_target_node == 2 else None)

    return lca_helper(tree, node0, node1).ancestor


# print(lca(tree, {'data': 'K'}, {'data': 'B'}))

def lca_1(node_0, node_1):
    def get_depth(node):
        depth = 0

        while node:
            depth += 1
            node = node['parent']

        return depth

    depth_0, depth_1 = get_depth(node_0), get_depth(node_1)

    if depth_1 > depth_0:
        node_0, node_1 = node_1, node_0

    depth_diff = abs(depth_0 - depth_1)

    while depth_diff:
        node_0 = node_0['parent']
        depth_diff -= 1

    while node_0 is not node_1:
        node_0, node_1 = node_0['parent'], node_1['parent']

    return node_0


# tree_with_parent_pointer = create_binary_tree([('A', 314)])

# tree_with_parent_pointer_left = create_binary_tree([('B', 6)])


# left_leaf = create_binary_tree([('C', 2)])
# right_leaf = create_binary_tree([('F', 2)])

# left_leaf['parent'] = tree_with_parent_pointer_left
# right_leaf['parent'] = tree_with_parent_pointer_left

# tree_with_parent_pointer_left['left'] = left_leaf
# tree_with_parent_pointer_left['right'] = right_leaf

# tree_with_parent_pointer['left'] = tree_with_parent_pointer_left


# print('lca for node with parent pointer', lca_1(right_leaf, left_leaf))


def sum_root_to_leaf(tree, partial_path_sum=0):
    if not tree:
        return 0

    partial_path_sum = partial_path_sum * 2 + tree['value']

    if not tree.get('left') and not tree.get('right'):
        return partial_path_sum

    return (sum_root_to_leaf(tree.get('left'), partial_path_sum) + sum_root_to_leaf(tree.get('right'), partial_path_sum))


# tree_binary = create_binary_tree(
#     [('A', 1), ('B', 0), ('C', 0), ('D', 0), ('E', 1), ('F', 1), ('G', 1), ('H', 0)])

# print('sum_root_to_leaf', sum_root_to_leaf(tree_binary))

def has_path_sum(tree, remaining_weight):
    if not tree:
        print('no tree')
        return False
    if not tree.get('left') and not tree.get('right'):
        print('val', remaining_weight, tree.get('value'), tree.get('data'))
        return remaining_weight == tree.get('value')

    return has_path_sum(tree.get('left'), remaining_weight - tree.get('value')) or has_path_sum(tree.get('right'), remaining_weight - tree.get('value'))


tree_sum_path = create_binary_tree(
    [('A', 9), ('B', 5), ('C', 3), ('D', 12), ('E', 11), ('F', 13)])

# print('has_path_sum', has_path_sum(tree_sum_path, 32))


def inorder_traversal(tree):
    s, result = [], []

    while s or tree:
        if tree:
            s.append(tree)
            tree = tree.get('left')
        else:
            tree = s.pop()
            result.append(tree.get('value'))
            tree = tree.get('right')

    return result


# print('inorder_traversal', inorder_traversal(tree_sum_path))

def preorder_traversal(tree):
    path, result = [tree], []

    while path:
        curr = path.pop()

        if curr:
            result.append(curr.get('value'))
            path += [curr.get('right'), curr.get('left')]

    return result


# print('preorder_traversal', preorder_traversal(tree_sum_path))

def find_kth_node_binary_tree(tree, k):
    while tree:
        left_size = tree.get('left').get('size') if tree.get('left') else 0

        print(left_size)

        if left_size + 1 < k:
            k -= left_size + 1
            tree = tree.get('right')
        elif left_size == k - 1:
            return tree
        else:
            tree = tree.get('left')

    return None


# print('find_kth_node_binary_tree', find_kth_node_binary_tree(tree_sum_path, 3))

def find_successor(node):
    if node.get('right'):
        node = node.get('right')

        while node.get('left'):
            node = node.get('left')

        return node

    while node.get('parent') and node.get('parent').get('right') is node:
        node = node.get('parent')

    return node.get('parent')


# node_link = tree_sum_path.get('left').get('left')

# print('find_successor', find_successor(node_link))

def inorder_traversal_1(tree):
    prev, result = None, []
    next = None

    while tree:
        if prev is tree.get('parent'):
            if tree.get('left'):
                next = tree.get('left')
            else:
                result.append(tree.get('value'))
                next = tree.get('right') or tree.get('parent')
        elif tree.get('left') is prev:
            result.append(tree.get('value'))
            next = tree.get('right') or tree.get('parent')
        else:
            next = tree.get('parent')

        prev = tree
        tree = next

    return result


# print('inorder_traversal_1', inorder_traversal_1(tree_sum_path))


def BinaryTreeNode(data, left=None, right=None):
    return dict(data=data, left=left, right=right)


def binary_tree_from_preorder_inorder(preorder, inorder):
    node_to_inorder_index = {data: i for i, data in enumerate(inorder)}

    def binary_tree_from_preorder_inorder_helper(preorder_start, preorder_end, inorder_start, inorder_end):
        if preorder_end <= preorder_start or inorder_end <= inorder_start:
            return None

        root_inorder_idx = node_to_inorder_index[preorder[preorder_start]]
        left_subtree_size = root_inorder_idx - inorder_start

        return BinaryTreeNode(
            preorder[preorder_start],
            binary_tree_from_preorder_inorder_helper(
                preorder_start + 1,
                preorder_start + 1 + left_subtree_size,
                inorder_start,
                root_inorder_idx
            ),
            binary_tree_from_preorder_inorder_helper(
                preorder_start + 1 + left_subtree_size,
                preorder_end,
                root_inorder_idx + 1,
                inorder_end
            )
        )

    return binary_tree_from_preorder_inorder_helper(0, len(preorder), 0, len(inorder))


# preorder = ['H', 'B', 'F', 'E', 'A']
# inorder = ['F', 'B', 'A', 'E', 'H']
# print('binary_tree_from_preorder_inorder',
#       binary_tree_from_preorder_inorder(preorder, inorder))

def reconstruct_preorder(preorder):
    def reconstruct_preorder_helper(preorder_iter):
        try:
            subtree_key = next(preorder_iter)
            if subtree_key is None:
                return None
        except StopIteration:
            return None

        left_subtree = reconstruct_preorder_helper(preorder_iter)
        right_subtree = reconstruct_preorder_helper(preorder_iter)

        return BinaryTreeNode(subtree_key, left_subtree, right_subtree)

    return reconstruct_preorder_helper(iter(preorder))


reconstructed_tree = reconstruct_preorder(
    ['H', 'B', 'F', None, None, "E", "A", None, None, None, 'C', None, 'D'])
# print('reconstruct_preorder', reconstruct_preorder(reconstructed_tree))


def create_list_from_leaves(tree):
    if not tree:
        return []
    if not tree.get('left') and not tree.get('right'):
        return [tree]

    return create_list_from_leaves(tree.get('left')) + create_list_from_leaves(tree.get('right'))


# print('create_list_from_leaves', create_list_from_leaves(reconstructed_tree))


def exterior_binary_tree(tree):
    def is_leaf(node):
        return not node.get('left') and not node.get('right')

    def left_boundary_and_leaves(subtree, is_boundary):
        if not subtree:
            return []

        return (([subtree] if is_boundary or is_leaf(subtree) else [])
                + left_boundary_and_leaves(subtree.get('left'), is_boundary)
                + left_boundary_and_leaves(subtree.get('right'), is_boundary and not subtree.get('left')))

    def right_boundary_and_leaves(subtree, is_boundary):
        if not subtree:
            return []

        return (right_boundary_and_leaves(subtree.get('left'), is_boundary and not subtree.get('right'))
                + right_boundary_and_leaves(subtree.get('right'), is_boundary)
                + ([subtree] if is_boundary or is_leaf(subtree) else []))

    return [tree] + right_boundary_and_leaves(tree.get('left'), True) + right_boundary_and_leaves(tree.get('right'), True) if tree else []


# print('exterior_binary_tree', exterior_binary_tree(reconstructed_tree))

def construct_right_sibling(tree):
    def populate_children_next_field(start_node):
        while start_node and start_node.get('left'):
            start_node.get('left')['next'] = start_node.get('right')
            start_node.get('right')['next'] = start_node.get(
                'next') and start_node.get('next').get('left')
            start_node = start_node.get('next')

    while tree and tree.get('left'):
        populate_children_next_field(tree)
        tree = tree.get('left')
