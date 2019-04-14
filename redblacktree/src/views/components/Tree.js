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
        this.renderContent = this.renderContent.bind(this);
        this.state = {
            snapshot: null,
            dimension: null
        }
    }

    componentDidMount() {
        this.setState({
            dimensions: {
                width: this.container.offsetWidth,
                height: this.container.offsetHeight,
            },
        });
    }

    handleInsert(task) {


    }

    handleDelete(task) {

    }

    calculateX(path, level, treeWidth) {
        if (path.length != level) {
            console.log('OMG');
            console.log(path, level);
        }

        var maxWidth = treeWidth;
        var x = this.partitionWidth(0, treeWidth, path); 
        return x;
    }

    partitionWidth(low, high, path) {
        var half = (high + low) / 2.0;
        if (path == '') {
            return half;
        } else if (path[0] == 'L') {
            return this.partitionWidth(low, half, path.slice(1));
        } else {
            return this.partitionWidth(half, high, path.slice(1));
        }
    }


    renderContent() {
        const nodes = [];
        const paths = [];

        var snapshot = this.props.snapshots[this.props.taskId];


        var width = this.state.dimensions.width;
        var height = this.state.dimensions.height;

        var nodeMap = snapshot.compile();
        let levels = Object.getOwnPropertyNames(nodeMap);
        let depth = levels.length;
        let treeDepth = depth-1;
        
        for (var i=0; i < depth; i++) {
            let level = levels[i];
            let nodesAtLevel = nodeMap[level];
            for (var j=0; j < nodesAtLevel.length; j++) {
                let nodeId = nodesAtLevel[j];
                if (nodeId != null) {
                    var nodeObj = snapshot.getNode(nodeId);
                    var x = this.calculateX(nodeObj.nodePath, level, width);
                    var y = level * Node.SIZE;
                    var node = (<Node id={nodeId}
                        level={parseInt(level)} 
                        index={j} 
                        key={nodeId}
                        data={nodeObj.data}
                        nodePath={nodeObj.nodePath}
                        x={x}
                        y={y}
                        color={nodeObj.color}
                        treeDepth={depth-1}/>)
                    nodes.push(node);
                }
            }

        }
        return(
            <div className='tree'> 

            { nodes }
            { paths }

            </div>
        );
    }

    render() {
        return (
            <div className="treeContainer" ref={el => (this.container = el)}>
            {this.state.dimensions && this.renderContent()}  
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
