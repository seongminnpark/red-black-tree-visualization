import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Styles/Node.css';

const NODE_SIZE = 50;

class Node extends Component{

    render() {
        
        var left = this.props.index * NODE_SIZE; 
        var top = this.props.level * NODE_SIZE; 
        var right = left + NODE_SIZE;
        var bottom = top + NODE_SIZE;

        var styles = {
            position: 'absolute',
            left: left + 'px',
            top: top + 'px',
            width: NODE_SIZE,
            height: NODE_SIZE
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
    index: PropTypes.number
};

export default Node;
