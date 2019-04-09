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
    }

    handleInsert(task) {
    }

    handleDelete(task) {

    }

    render() {

        var tasks = this.props.tasks;

        tasks.map((task) => {
            switch (task.type) {
                case TreeLogger.INSERT:
                    this.handleInsert(task);
                    break;
                case TreeLogger.DELETE:
                    this.handleDelete(task);
                    break;
                default: 
                    break;
            }
        });

        const nodes = [];
        const paths = [];

        const nodeMap = this.props.nodeMap;
        let levels = Object.getOwnPropertyNames(nodeMap);
        let depth = levels.length;
        for (var i=0; i < depth; i++) {
            let level = levels[i];
            let nodesAtLevel = nodeMap[level];
            for (var i=0; i < nodesAtLevel.length; i++) {
                let nodeId = nodesAtLevel[i];
                if (nodeId != null) {
                    var node = (<Node id={nodeId}
                        level={parseInt(level)} 
                        index={i} 
                        key={nodeId}
                        treeDepth={depth-1}/>);
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
    tasks: PropTypes.array,
    nodeMap: PropTypes.object
}

export default Tree;
