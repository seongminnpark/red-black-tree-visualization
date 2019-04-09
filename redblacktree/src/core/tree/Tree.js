export class Node {
    
    static get ROOT() { return 'ROOT'; }
    static get LEFT() { return 'LEFT'; }
    static get RIGHT() { return 'RIGHT'; }

    static get RED() { return 'RED'; }
    static get BLACK() { return 'BLACK'; }

    constructor() {
        this.data = null;
        this.leftChild = null;
        this.rightChild = null;
        this.parent = null;
        this.direction = null;
        this.count = 1;
        this.color = Node.BLACK;
    }

    recolor() {
        if (this.color === Node.RED) {
            this.color = Node.BLACK;
        } else {
            this.color = Node.RED;
        }
    }

    get isRoot() {
        return this.parent == null;
    }

    get grandParent() {
        if (this.isRoot) {
            return null;
        } else {
            return this.parent.parent;
        }
    }

    get uncle() {
        var grandParent = this.grandParent;

        if (this.isRoot) {
            return null;

        } else if (grandParent == null) {
            return null;

        } else {
            if (grandParent.leftChild === this.parent) {
                return grandParent.rightChild;
            } else {
                return grandParent.leftChild;
            }
        }
    }

}

export default class Tree {

    constructor() {
        this.root = null;
        this.nodeMap = {};
        this.logger = new TreeLogger();
    }
    
    // Getter functions. 
    
    getNode(nodeId) {
        return this.nodeMap[nodeId];
    }

    compile() {
        var map = {};
        this.compileNode(this.root, map, 0); 
        return map;
    }

    compileNode(node, map, level) {

        // Push current node into map.
        var levelKey = level.toString();
        if (map[levelKey] === undefined) {
            map[levelKey] = [];
        } 
        
        if (node == null) {
            map[levelKey].push(null);
        } else {  
            map[levelKey].push(node.id);
            // Push children into node.
            this.compileNode(node.leftChild, map, level + 1);
            this.compileNode(node.rightChild, map, level + 1);
        }
    }

    // Validity functions.
    
    fix(jobId) {
        while(this.fixNodes(jobId, this.root)) {
        
        } 
    }

    fixNodes(jobId, node) { 
        var curr = this.fixNode(jobId, node);
        var left = node.leftChild == null ? 
            false : this.fixNodes(jobId, node.leftChild);
        var right = node.rightChild == null ? 
            false : this.fixNodes(jobId, node.rightChild);
        return curr || left || right;
    }

    fixNode(jobId, node) {

        if (node == null || node.color !== Node.RED) {
            return false;
        } 
        
        var parent = node.parent;
        var grandParent = node.grandParent;
        var uncle = node.uncle;
       
        if (node.isRoot && node.color === Node.RED) { 
            // Case 1 - Node is root.
            this.logger.log(jobId, TreeLogger.ERROR, node.id, null, 1); 
            this.recolor(jobId, node);
            return true;
            
        } else if (uncle != null && uncle.color === Node.RED) { 
            // Case 2 - Uncle is red.
            this.logger.log(jobId, TreeLogger.ERROR, node.id, null, 2); 
            parent.recolor();
            grandParent.recolor();
            uncle.recolor();
            return true;
        
        } else if (uncle == null || uncle.color === Node.BLACK) {  
            if (parent.color === Node.RED && 
                parent.direction !== node.direction) {
                // Case 3 - Uncle is black and triangle exists.
                this.logger.log(jobId, TreeLogger.ERROR, node.id, null, 3); 
                if (node.direction === Node.LEFT) {
                    this.rotateRight(jobId, parent);
                } else {
                    this.rotateLeft(jobId, parent);
                }
                return true; 
                
            } else if (parent.color === Node.RED && 
                parent.direction === node.direction) {
                // Case 4 - Unlce is black and line exists.
                this.logger.log(jobId, TreeLogger.ERROR, node.id, null, 4); 
                if (node.direction === Node.LEFT) {
                    this.rotateRight(jobId, grandParent);
                } else {
                    this.rotateLeft(jobId, grandParent);
                }
                this.recolor(jobId, grandParent);
                this.recolor(jobId, parent);
                return true;
            }
        }

        return false;
    }

    recolor(jobId, node) {
        node.recolor();
        this.logger.log(jobId, TreeLogger.RECOLOR, node.id, null, node.color); 
    }

    // Rotation functions.
    
    rotateLeft(jobId, node) {
        this.logger.log(jobId, TreeLogger.ROTATE, node.id, null, Node.LEFT); 

        var rightChild = node.rightChild;
        var parent = node.parent;
        var direction = node.direction;
        var rightChildLeftChild = rightChild.leftChild;

        if (node.isRoot) {
            this.root = rightChild;
        }

        node.parent = rightChild;
        node.direction = Node.LEFT;
        node.rightChild = rightChildLeftChild;

        rightChild.parent = parent; 
        rightChild.direction = direction;
        rightChild.leftChild = node;
    }

    rotateRight(jobId, node) {
        this.logger.log(jobId, TreeLogger.ROTATE, node.id, null, Node.RIGHT); 

        var leftChild = node.leftChild;
        var parent = node.parent;
        var direction = node.direction;
        var leftChildRightChild = leftChild.rightChild;

        if (node.isRoot) {
            this.root = leftChild;
        }

        node.parent = leftChild;
        node.direction = Node.RIGHT;
        node.leftChild = leftChildRightChild;

        leftChild.parent = parent; 
        leftChild.direction = direction;
        leftChild.rightChild = node; 
    }

    // Visualization functions.
    
    print() {
        this.printSubtree(this.root);
    }

    printSubtree(node) {
        if (node == null) {
            return;
        }
        console.log(node.data, node.color);
        this.printSubtree(node.leftChild);
        this.printSubtree(node.rightChild);
    } 

    // Insertion functions. 
    
    insert(jobId, data) {
        this.logger.createEvent(jobId);
        
        // Insert node and color it red.
        var newId = this.bstInsert(jobId, this.root, data);    
        if (newId != null) {
            var newNode = this.getNode(newId);
            newNode.color = Node.RED; 
        }

        // Satisfy constraints.
        this.fix(jobId); 
    } 

    bstInsert(jobId, node, data) {

        if (node == null) {
            return this.insertAt(jobId, node, Node.ROOT, data);

        } else {

            this.logger.log(jobId, TreeLogger.LOOK, node.id, null, null);

            if (node.data === data) {
                this.logger.log(jobId, TreeLogger.COMPARE, node.id, null, null);
                node.count += 1;
                return null;

            } else if (node.data > data) {

                if (node.leftChild == null) {
                    return this.insertAt(jobId, node, Node.LEFT, data);
                } else {
                    return this.bstInsert(jobId, node.leftChild, data);
                }

            } else {

                if (node.rightChild == null) {
                    return this.insertAt(jobId, node, Node.RIGHT, data); 
                } else {
                    return this.bstInsert(jobId, node.rightChild, data);
                }
            }
        }

    }

    insertAt(jobId, parent, direction, data) {

        var newNode = new Node();
        newNode.data = data;
        newNode.parent = parent;
        var newId = Math.random().toString(36).slice(2);
        newNode.id = newId;
        newNode.direction = direction;
        this.nodeMap[newId] = newNode;
        
        var parentId = parent == null ? null : parent.id;

        this.logger.log(jobId, TreeLogger.INSERT, 
            newId, parentId, direction);

        if (direction === Node.ROOT) {
            this.root = newNode; 

        } else if (direction === Node.LEFT) {
            parent.leftChild = newNode;

        } else if (direction === Node.RIGHT) {
            parent.rightChild = newNode; 
        }

        return newId;

    }

}

export class TreeLogger {

    static get LOOK() { return 'LOOK'; }
    static get INSERT() { return 'INSERT'; }
    static get ROTATE() { return 'ROTATE'; }
    static get ERROR() { return 'ERROR'; }
    static get RECOLOR() { return 'RECOLOR'; }

    constructor() {
        this.logs = {};
    }

    createEvent(jobId) {
        this.logs[jobId] = []
    }

    printJob(jobId) {
        console.log(this.logs[jobId]);
    }

    log(jobId, eventType, nodeId, parentId, extra) {

        var eventLogs = this.logs[jobId];
        //var logString = eventLogs.length === 0 ? '' : ','; 
        var nodeIdString = nodeId == null ? '.' : String(nodeId);
        var parentIdString = parentId == null ? '.' : String(parentId);
        var extraString = extra == null ? '.' : String(extra);

        eventLogs.push(eventType
            + ':' + nodeIdString + ':' + parentIdString 
            + ':' + extraString);
    }

    getLogs(jobId) {
        return this.logs[jobId];
    }
}
