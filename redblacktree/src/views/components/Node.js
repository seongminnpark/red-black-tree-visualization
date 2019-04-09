import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Styles/Node.css';

const NODE_SIZE = 50;

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
        
        var left = this.props.index * NODE_SIZE; 
        var top = this.props.level * NODE_SIZE; 
        var right = left + NODE_SIZE;
        var bottom = top + NODE_SIZE;

        var styles = {
            position: 'absolute',
            left: left + 'px',
            top: top + 'px',
            width: NODE_SIZE,
            height: NODE_SIZE,
            backgroundColor: this.color
        };

        return (
           <div className='node' 
                style={styles}></div>
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
