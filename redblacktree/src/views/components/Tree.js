import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Styles/Tree.css';
import Node from './Node';

import { treeOperations } from '../../state/ducks/tree';

class Tree extends Component {

    render() {
        return (

            <div className='tree'> 
                
                

            </div>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Tree)
