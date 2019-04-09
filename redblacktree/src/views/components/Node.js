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

    render() {

        const levelWidth = 2**this.props.level;
        const direction = levelWidth / 2 - 1 > this.props.index ? 1 : -1;
        const indexDeltaFromMiddle = Math.abs(levelWidth/2 - this.props.index);
        const middle = 2**this.props.treeDepth / 2 * SLOT_SIZE;

        const treeWidth = 2 ** this.props.treeDepth * SLOT_SIZE;
        const indexRatio = this.props.index*1.0 / levelWidth;
        
        var left = indexRatio * SLOT_SIZE + MARGIN; 
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
