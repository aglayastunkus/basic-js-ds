const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
module.exports = class BinarySearchTree {
    constructor() {
        this.rootNode = null;
    }

    root() {
        return this.rootNode
    }

    add(data) {
        const newNode = new Node(data);
        this.rootNode === null? this.rootNode = newNode : addHelper(this.rootNode, newNode);
    }

    has(data) {
        return searchHelperHas(this.rootNode, data);
    }

    find(data) {
        return searchHelperFind(this.rootNode, data)
    }

    remove(data) {
        this.rootNode = deleteNodeHelper(this.rootNode, data);
    }

    min() {
        if (this.rootNode === null) return null;
        let current = this.rootNode;
        while (current.left !== null) {
            current = current.left;
        }
        return current.data;
    }

    max() {
        if (this.rootNode === null) return null;
        let current = this.rootNode;
        while (current.right !== null) {
            current = current.right;
        }
        return current.data;
    }

};
function addHelper(current, newNode) {
    if(newNode.data < current.data) {
        if(current.left === null) {
            current.left = newNode;
        } else {
            addHelper(current.left, newNode);
        }
    } else {
        if(current.right === null) {
            current.right = newNode;
        } else {
            addHelper(current.right,newNode);
        }
    }
}
function deleteNodeHelper(root, key) {
    if (key < root.data) {
        root.left = deleteNodeHelper(root.left, key);
        return root;
    } else if (key > root.data) {
        root.right = deleteNodeHelper(root.right, key);
        return root;
    } else {
// No children
//case 1 - a leaf node
        if (root.left === null && root.right === null) {
            root = null;
            return root;
        }

// Single Child cases
        if (root.left === null) return root.right;
        if (root.right === null) return root.left;

// Both children, so need to find successor
        let currNode = root.right;

        while (currNode.left !== null) {
            currNode = currNode.left;
        } root.data = currNode.data;

// Delete the value from right subtree.
        root.right = deleteNodeHelper(root.right, currNode.data);
        return root;
    }

}
function searchHelperHas(node, data) {
    if(!node) return false;
    if(node.data === data) return true;
    return data < node.data ? searchHelperHas(node.left, data) : searchHelperHas(node.right, data);
}
function searchHelperFind(node, data) {
    if(node === null) return null;
    if(data < node.data) return searchHelperFind(node.left, data);
    if(data > node.data) return searchHelperFind(node.right, data);
    return node;
}