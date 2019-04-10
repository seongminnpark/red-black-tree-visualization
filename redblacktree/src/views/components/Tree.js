import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Styles/Tree.css';
import TreeCore, { NodeCore, TreeLogger } from '../../core/tree/Tree';
import Node from './Node';

class Tree extends Component {

    constructor(props) {
        super(props);
        this.handleInsert = this.handleInsert.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            snapshot: null,
            jobId: null,
            taskIndex: null
        }
    }

    handleInsert(task) {
        
        
    }

    handleDelete(task) {

    }

    render() {

        const nodes = [];
        const paths = [];

        var snapshot = this.props.snapshots[this.props.taskId];

        var nodeMap = snapshot.compile();
        let levels = Object.getOwnPropertyNames(nodeMap);
        let depth = levels.length;
        for (var i=0; i < depth; i++) {
            let level = levels[i];
            let nodesAtLevel = nodeMap[level];
            for (var j=0; j < nodesAtLevel.length; j++) {
                let nodeId = nodesAtLevel[j];
                if (nodeId != null) {
                    var nodeObject = this.props.tree.getNode(nodeId);
                    var node = (<Node id={nodeId}
                        level={parseInt(level)} 
                        index={j} 
                        key={nodeId}
                        data={nodeObject.data}
                        nodePath={nodeObject.nodePath}
                        color={nodeObject.color}
                        treeDepth={depth-1}/>)
                    nodes.push(node);
                }
            }

        }

        return (

            <div className='tree'> 

            { nodes }
            { paths }

            </div>
        )

    }
}

Tree.propTypes = {
    snapshots: PropTypes.array,
    taskId: PropTypes.number,
    tree: PropTypes.object  
}

export default Tree;
