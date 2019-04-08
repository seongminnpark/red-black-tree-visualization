import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Styles/Tree.css';
import TreeCore from '../../core/tree/Tree';
import Node from './Node';

import { treeOperations } from '../../state/ducks/tree';

class Tree extends Component {

    componentDidMount() {
        this.props.initTree();
    }

    render() {
        return (

            <div className='tree'> 
                
                

            </div>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        tree: state.tree.tree 
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        initTree: treeOperations.initTree,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Tree)
