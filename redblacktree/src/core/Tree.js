export class Node {

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
        var jobId = data.toString();
        this.logger.createEvent(jobId);
        this.bstInsert(jobId, this.root, data);   

    }

    bstInsert(jobId, node, data) {

        if (node == null) {
            this.insertAt(jobId, node, 'ROOT', data);

        } else {

            this.logger.log(jobId, TreeLogger.LOOK, node.id, null, null);

            if (node.data === data) {
                this.logger.log(jobId, TreeLogger.COMPARE, node.id, null, null);
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

    insertAt(jobId, parentNode, direction, data) {

        var newNode = new Node();
        newNode.data = data;
        var newId = Math.random().toString(36).slice(2);
        newNode.id = newId;
        this.nodeMap[newId] = newNode;
        
        var parentId = parentNode == null ? null : parentNode.id;

        this.logger.log(jobId, TreeLogger.INSERT, 
            newId, parentId, direction);

        if (direction === 'ROOT') {
            newNode.nodePath = '';
            this.root = newNode; 

        } else if (direction === 'LEFT') {
            newNode.nodePath = parentNode.nodePath + 'L'; 
            parentNode.leftChild = newNode;

        } else if (direction === 'RIGHT') {
            newNode.nodePath = parentNode.nodePath + 'R';
            parentNode.rightChild = newNode; 
        }

    }

}

export class TreeLogger {

    static get LOOK() { return 'LOOK'; }
    static get INSERT() { return 'INSERT'; }

    constructor() {
        this.logs = {};
    }

    createEvent(jobId) {
        this.logs[jobId] = []
    }

    printJob(jobId) {
        console.log(this.logs[jobId]);
    }

    log(jobId, eventId, nodeId, parentId, extra) {

        var eventLogs = this.logs[jobId];
        //var logString = eventLogs.length === 0 ? '' : ','; 
        var nodeIdString = nodeId == null ? '.' : String(nodeId);
        var parentIdString = parentId == null ? '.' : String(parentId);
        var extraString = extra == null ? '.' : String(extra);

        eventLogs.push(eventId 
            + ':' + nodeIdString + ':' + parentIdString 
            + ':' + extraString);
    }
}
