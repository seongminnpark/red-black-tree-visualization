import React, { Component } from 'react';

import './Styles/Tree.css';
import TreeCore from '../../core/tree/Tree';
import Node from './Node';

export default class Tree extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nodeMap: {}
        }
    }

    componentDidMount() {
        var tree = new TreeCore(); 
        tree.insert(1);
        tree.insert(2);
        tree.insert(3);
        var nodeMap = tree.compile();
        this.setState({
            nodeMap: nodeMap
        });
    }

    render() {
        
        const nodes = [];
        const paths = [];

        const nodeMap = this.state.nodeMap;
        
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
