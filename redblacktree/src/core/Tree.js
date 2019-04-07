class Node {

    constructor() {
        this.data = null;
        this.leftChild = null;
        this.rightChild = null;
        this.nodePath = null;
        this.count = 1;
    }

    isLeaf() {
        return this.leftChild == null && this.rightChild == null;
    }

}

export default class Tree {

    constructor() {
        this.root = null;
        this.nodeMap = {};
        this.logger = new TreeLogger();
    }

    print() {
        this.printSubtree(this.root);
    }

    printSubtree(node) {
        if (node == null) {
            return;
        }
        console.log(node.data);
        this.printSubtree(node.leftChild);
        this.printSubtree(node.rightChild);
    }

    isBalanced() {
        if (this.root == null) {
            return true;
        }
    }

    insert(data) {
        var jobId = 'aaa';
        this.logger.createEvent(jobId);
        this.bstInsert(jobId, this.root, data);   

    }

    bstInsert(jobId, node, data) {


        if (node == null) {
            this.insertAt(jobId, node, 'ROOT', data);

        } else {

            this.logger.log(jobId, TreeLogger.LOOK, node.id, null);

            if (node.data == data) {
                this.logger.log(jobId, TreeLogger.COMPARE, node.id, null);
                node.count += 1;

            } else if (node.data > data) {

                if (node.leftChild == null) {
                    this.insertAt(jobId, node, 'LEFT', data);
                } else {
                    this.bstInsert(jobId, node.leftChild, data);
                }

            } else {

                if (node.rightChild == null) {
                    this.insertAt(jobId, node, 'RIGHT', data); 
                } else {
                    this.bstInsert(jobId, node.rightChild, data);
                }
            }
        }

    }

    insertAt(jobId, node, direction, data) {

        var nodeId = node == null ? null : node.id;

        this.logger.log(jobId, TreeLogger.INSERT, nodeId, direction);

        var newNode = new Node();
        newNode.data = data;

        if (direction == 'ROOT') {
            newNode.nodePath = '';
            this.root = newNode; 

        } else if (direction == 'LEFT') {
            newNode.nodePath = node.nodePath + 'L'; 
            node.leftChild = newNode;

        } else if (direction == 'RIGHT') {
            newNode.nodePath = node.id = node.nodePath + 'R';
            node.rightChild = newNode; 
        }
    }

}

class TreeLogger {

    static get LOOK() { return 'LOOK'; }
    static get INSERT() { return 'INSERT'; }

    constructor() {
        this.logs = {};
    }

    createEvent(jobId) {
        this.logs[jobId] = []
    }

    log(jobId, eventId, nodeId, extra) {

        var eventLogs = this.logs[jobId];
        var logString = eventLogs.length == 0 ? '' : ','; 
        var nodeIdString = nodeId == null ? '.' : String(nodeId);
        var extraString = extra == null ? '.' : String(extra);

        this.logs[jobId].push(logString + ':' + eventId + ':' 
            + nodeIdString + ':' + extraString);
    }
}
