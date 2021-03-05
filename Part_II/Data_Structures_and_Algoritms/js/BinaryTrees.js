function createBinaryTree(nodes, treeRoot = null) {
    function addNode(node, root, parent = null) {
        const [data, value] = node;

        if (!root) {
            return { data, value, size: 0, parent };
        }

        const treeSide = root.value > value ? 'left' : 'right';

        root.size += 1;
        root[treeSide] = root[treeSide]
            ? addNode(node, root[treeSide])
            : addNode(node, null, root);

        return root;
    }

    for (let node of nodes) {
        treeRoot = addNode(node, treeRoot);
    }

    return treeRoot;
}

const tree = createBinaryTree([
    ['A', 9],
    ['B', 5],
    ['C', 3],
    ['D', 1],
    ['E', 0],
    ['F', 2],
    ['G', 4],
    ['H', 7],
    ['I', 6],
    ['J', 8],
    ['K', 13],
    ['O', 14],
    ['L', 11],
    ['M', 10],
    ['N', 12]
]);

// console.log(tree);

function isBalancedBinaryTree(tree) {
    const BalancedStatusWithHeight = (balanced, height) => ({
        balanced,
        height
    });

    function checkBalanced(tree) {
        if (!tree) {
            return BalancedStatusWithHeight(true, -1);
        }

        const leftResult = checkBalanced(tree.left);

        if (!leftResult.balanced) {
            return BalancedStatusWithHeight(false, 0);
        }

        const rightResult = checkBalanced(tree.right);

        if (!rightResult.balanced) {
            return BalancedStatusWithHeight(false, 0);
        }

        const isBalanced =
            Math.abs(leftResult.height - rightResult.height) <= 1;
        const height = Math.max(leftResult.height, rightResult.height) + 1;

        return BalancedStatusWithHeight(isBalanced, height);
    }

    return checkBalanced(tree).balanced;
}

// console.log('isBalancedBinaryTree', isBalancedBinaryTree(tree));

function isSymmetric(tree) {
    function checkSymmetric(subtree_0, subtree_1) {
        if (subtree_0 && subtree_1) {
            return true;
        } else if (subtree_0 && subtree_1) {
            return (
                subtree_0.value === subtree_1.value &&
                checkSymmetric(subtree_0.left, subtree_1.right) &&
                checkSymmetric(subtree_0.right, subtree_1.left)
            );
        }
    }

    return !tree || checkSymmetric(tree.left, tree.right);
}

const symmetricTree = createBinaryTree([['A', 314]]);

const symmetricTreeLeft = createBinaryTree([['B', 6]]);
const symmetricTreeRight = createBinaryTree([['E', 6]]);

symmetricTreeLeft.right = createBinaryTree([['C', 2]]);
symmetricTreeRight.left = createBinaryTree([['F', 2]]);
symmetricTree.left = symmetricTreeLeft;
symmetricTree.right = symmetricTreeRight;

// console.log('isSymmetric', isSymmetric(symmetricTree));

function lca(tree, node0, node1) {
    const status = (numTargetAncestor = 0, ancestor = null) => ({
        numTargetAncestor,
        ancestor
    });

    function lcaHelper(tree, node0, node1) {
        if (!tree) {
            return status();
        }

        const leftResult = lcaHelper(tree.left, node0, node1);
        if (leftResult.numTargetAncestor == 2) {
            return leftResult;
        }
        const rightResult = lcaHelper(tree.right, node0, node1);
        if (rightResult.numTargetAncestor == 2) {
            return rightResult;
        }

        const numTargetNode =
            leftResult.numTargetAncestor +
            rightResult.numTargetAncestor +
            (tree.data === node0.data ? 1 : 0) +
            (tree.data === node1.data ? 1 : 0);

        return status(numTargetNode, numTargetNode === 2 ? tree : null);
    }

    return lcaHelper(tree, node0, node1).ancestor;
}

// console.log('lca', lca(tree, { data: 'K' }, { data: 'B' }));

function lca_1(node_0, node_1) {
    function getDepth(node) {
        let depth = 0;

        while (node) {
            node = node.parent;
            depth += 1;
        }

        return depth;
    }

    let depth_0 = getDepth(node_0);
    let depth_1 = getDepth(node_1);

    if (depth_1 > depth_0) {
        const temp = depth_0;

        depth_0 = depth_1;
        depth_1 = temp;
    }

    const depthDiff = Math.abs(depth_0 - depth_1);

    while (depthDiff) {
        node_0 = node_0.parent;
        depth -= 1;
    }

    while (node_0 !== node_1) {
        node_0 = node_0.parent;
        node_1 = node_1.parent;
    }

    return node_0;
}

// const treeWithParent = createBinaryTree([['A', 314]]);
// const treeWithParentLeft = createBinaryTree([['B', 6]]);

// const left_leaf = createBinaryTree([['C', 2]]);
// const right_leaf = createBinaryTree([['D', 2]]);

// left_leaf.parent = treeWithParentLeft;
// right_leaf.parent = treeWithParentLeft;

// treeWithParentLeft.left = left_leaf;
// treeWithParentLeft.right = right_leaf;
// treeWithParent.left = treeWithParentLeft;

// console.log('Get lca by parent pointer', lca_1(left_leaf, right_leaf));

function sumRootToLeaf(tree, partialPathSum = 0) {
    if (!tree) {
        return 0;
    }
    partialPathSum = partialPathSum * 2 + tree.value;

    if (!tree.left & !tree.right) {
        return partialPathSum;
    }

    return (
        sumRootToLeaf(tree.left, partialPathSum) +
        sumRootToLeaf(tree.right, partialPathSum)
    );
}

// const treeBinary = createBinaryTree([
//     ['A', 1],
//     ['B', 0],
//     ['C', 0],
//     ['D', 0],
//     ['E', 1],
//     ['F', 1],
//     ['G', 1],
//     ['H', 0]
// ]);

// console.log('sumRootToLeaf', sumRootToLeaf(treeBinary));

function hasSumPath(tree, remainingWeight) {
    if (!tree) {
        return false;
    }

    if (!tree.left && !tree.right) {
        return remainingWeight === tree.value;
    }

    return (
        hasSumPath(tree.left, remainingWeight - tree.value) ||
        hasSumPath(tree.right, remainingWeight - tree.value)
    );
}

const treeBinary = createBinaryTree([
    ['A', 9],
    ['B', 5],
    ['C', 3],
    ['D', 12],
    ['E', 11],
    ['F', 13]
]);

// console.log('hasSumPath', hasSumPath(treeBinary, 32));

function inorderTraversal(tree) {
    const s = [];
    const result = [];

    while (tree || s.length) {
        if (tree) {
            s.push(tree);
            tree = tree.left;
        } else {
            tree = s.pop();
            result.push(tree.value);
            tree = tree.right;
        }
    }

    return result;
}

// console.log('inorderTraversal', inorderTraversal(treeBinary));

function preorderTraversal(tree) {
    const path = [tree];
    const result = [];

    while (path.length) {
        const curr = path.pop();

        if (curr) {
            result.push(curr.value);
            path.push(curr.right, curr.left);
        }
    }
    return result;
}

// console.log('preorderTraversal', preorderTraversal(treeBinary));

function findKthNodeBinaryTree(tree, k) {
    while (tree) {
        let leftSide = tree.left ? tree.left.size : 0;

        if (leftSide + 1 < k) {
            k -= leftSide + 1;
            tree = tree.right;
        } else if (leftSide === k - 1) {
            return tree;
        } else {
            tree = tree.left;
        }
    }

    return null;
}

// console.log('findKthNodeBinaryTree', findKthNodeBinaryTree(treeBinary, 3));

function findSuccessor(node) {
    if (node.right) {
        node = node.right;

        while (node.left) {
            node = node.left;
        }

        return node;
    }

    while (node.parent && node.parent.right === node) {
        node = node.parent;
    }

    return node.parent;
}

// const nodeLink = treeBinary.left.left;

// console.log('findSuccessor', findSuccessor(nodeLink));

function inorderTraversal_1(tree) {
    let prev = null;
    let next = null;
    const result = [];

    while (tree) {
        if (tree.parent === prev) {
            if (tree.left) {
                next = tree.left;
            } else {
                result.push(tree.value);
                next = tree.right || tree.parent;
            }
        } else if (tree.left === prev) {
            result.push(tree.value);
            next = tree.right || tree.parent;
        } else {
            next = tree.parent;
        }

        prev = tree;
        tree = next;
    }

    return result;
}

// console.log('inorderTraversal_1', inorderTraversal_1(treeBinary));

class BinaryTreeNode {
    constructor(data, left, right) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

function binaryTreFromPreorderInorder(preorder, inorder) {
    const nodeToInorderIdx = inorder.reduce(
        (memo, data, i) => ({ ...memo, [data]: i }),
        {}
    );

    function binaryTreFromPreorderInorderHelper(
        preorderStart,
        preorderEnd,
        inorderStart,
        inorderEnd
    ) {
        if (preorderEnd <= preorderStart || inorderEnd <= inorderStart) {
            return null;
        }

        const rootInorderIdx = nodeToInorderIdx[preorder[preorderStart]];
        const leftSubtreeSize = rootInorderIdx - inorderStart;

        return new BinaryTreeNode(
            preorder[preorderStart],
            binaryTreFromPreorderInorderHelper(
                preorderStart + 1,
                preorderStart + 1 + leftSubtreeSize,
                inorderStart,
                rootInorderIdx
            ),
            binaryTreFromPreorderInorderHelper(
                preorderStart + 1 + leftSubtreeSize,
                preorderEnd,
                rootInorderIdx + 1,
                inorderEnd
            )
        );
    }

    return binaryTreFromPreorderInorderHelper(
        0,
        preorder.length,
        0,
        inorder.length
    );
}

// const preorder = ['H', 'B', 'F', 'E', 'A'];
// const inorder = ['F', 'B', 'A', 'E', 'H'];
// console.log(
//     'binaryTreFromPreorderInorder',
//     binaryTreFromPreorderInorder(preorder, inorder)
// );

function reconstructPreorder(preorder) {
    function* preorderGen() {
        for (const data of preorder) {
            yield data;
        }
    }

    function reconstructPreorderHelper(preorderInner) {
        const { value } = preorderInner.next();

        if (!value) {
            return null;
        }

        const leftSubtree = reconstructPreorderHelper(preorderInner);
        const rightSubtree = reconstructPreorderHelper(preorderInner);

        return new BinaryTreeNode(value, leftSubtree, rightSubtree);
    }

    return reconstructPreorderHelper(preorderGen());
}

const reconstructedTree = reconstructPreorder([
    'H',
    'B',
    'F',
    null,
    null,
    'E',
    'A',
    null,
    null,
    null,
    'C',
    null,
    'D'
]);
// console.log(
//     'reconstructPreorder',
//     reconstructedTree
// );

function createTreeFromLeaves(tree) {
    if (!tree) {
        return [];
    }

    if (!tree.left && !tree.right) {
        return [tree];
    }

    return createTreeFromLeaves(tree.left).concat(
        createTreeFromLeaves(tree.right)
    );
}

// console.log('createTreeFromLeaves', createTreeFromLeaves(reconstructedTree));

function exteriorBinaryTree(tree) {
    function isLeaf(node) {
        return !node.left && !node.right;
    }

    function leftBoundaryAndLeaves(subtree, isBoundary) {
        if (!subtree) {
            return [];
        }

        return (isBoundary || isLeaf(subtree) ? [subtree] : []).concat(
            leftBoundaryAndLeaves(subtree.left, isBoundary),
            leftBoundaryAndLeaves(subtree.right, isBoundary && !subtree.left)
        );
    }
    function rightBoundaryAndLeaves(subtree, isBoundary) {
        if (!subtree) {
            return [];
        }

        return rightBoundaryAndLeaves(
            subtree.right,
            isBoundary && !subtree.left
        ).concat(
            rightBoundaryAndLeaves(subtree.left, isBoundary),
            isBoundary || isLeaf(subtree) ? [subtree] : []
        );
    }

    return tree
        ? [tree].concat(
              leftBoundaryAndLeaves(tree.left, true),
              rightBoundaryAndLeaves(tree.right, true)
          )
        : [];
}

console.log('exteriorBinaryTree', exteriorBinaryTree(reconstructedTree));

function constructRightSibling(tree) {
    function populateChildrenNextField(startNode) {
        while (startNode && startNode.left) {
            startNode.left.next = startNode.right;
            startNode.right.next = startNode.next && startNode.next.left;
            startNode = startNode.next;
        }
    }

    while (tree && tree.left) {
        populateChildrenNextField(tree);
        tree == tree.left;
    }
}
