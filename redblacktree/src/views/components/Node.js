import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Styles/Node.css';

const SLOT_SIZE = 70;

class Node extends Component{

    static get SIZE() { return 50; }
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

        const halfSize = Node.SIZE / 2;

        var left = this.props.x - halfSize;
        var right = this.props.x + halfSize;
        var top = this.props.y - halfSize;
        var bottom = this.props.y - halfSize;

        var styles = {
            position: 'absolute',
            left: left + 'px',
            top: top + 'px',
            width: Node.SIZE,
            height: Node.SIZE,
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
    treeDepth: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
};

export default Node;
