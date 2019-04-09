import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Styles/Node.css';

const NODE_SIZE = 50;
const SLOT_SIZE = 70;
const MARGIN = (SLOT_SIZE - NODE_SIZE) / 2.0

class Node extends Component{

    static get RED() { return '#f45a67'; } 
    static get BLACK() { return '#332425'; } 

    constructor(props) {
        super(props);
        this.color = Node.RED;
    }

    get idTextColor() { return ''; }
    
    get dataTextColor() { return ''; }
    
    calculateLeft(path, level, treeWidth) {
        if (path.length != level) {
            console.log("Funky nodepath!!!");
        }

        var maxWidth = SLOT_SIZE * treeWidth; 
        var left = this.partitionWidth(0, treeWidth, path);
        return left;
    }

    partitionWidth(low, high, path) {
        console.log(path)
        var half = (high+low) / 2.0
        if (path == '') {
            return half;

        } else if (path[0] == 'L') {
            return this.partitionWidth(low, half, path.slice(1));

        } else {
            return this.partitionWidth(half, high, path.slice(1));
        }
    }

    render() {

        const levelWidth = 2**this.props.level;
        const direction = levelWidth / 2 - 1 > this.props.index ? 1 : -1;
        const indexDeltaFromMiddle = Math.abs(levelWidth/2 - this.props.index);
        const middle = 2**this.props.treeDepth / 2 * SLOT_SIZE;

        const treeWidth = 2 ** this.props.treeDepth * SLOT_SIZE;
        
        var left = this.calculateLeft(this.props.nodePath, 
            this.props.level, treeWidth); 
        var top = this.props.level * SLOT_SIZE + MARGIN; 
        var right = left + NODE_SIZE;
        var bottom = top + NODE_SIZE;

        console.log(left, top, right,bottom)

        var styles = {
            position: 'absolute',
            left: left + 'px',
            top: top + 'px',
            width: NODE_SIZE,
            height: NODE_SIZE,
            backgroundColor: this.props.color
        };

        return (
           <div className='node' 
                style={styles}>
            <div className='nodeData'>{this.props.data}</div> 
            </div>
        )
    }
}

Node.propTypes = {
    id: PropTypes.string,
    level: PropTypes.number,
    index: PropTypes.number,
    treeDepth: PropTypes.number
};

export default Node;
