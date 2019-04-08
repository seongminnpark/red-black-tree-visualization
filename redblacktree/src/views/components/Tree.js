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
            nodeMap: {}, 
        }
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
        
        Object.getOwnPropertyNames(nodeMap).forEach(key => {
            let value = nodeMap[key];
            for (var i=0; i < value.length; i++) {
                var node = (<Node id={value[i]}
                                  level={parseInt(key)} 
                                  index={i} 
                                  key={value[i]}/>)
                nodes.push(node);
            }
        });

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
