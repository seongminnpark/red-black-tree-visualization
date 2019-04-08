import React, { Component } from 'react';

import './Styles/Tree.css';
import TreeCore from '../../core/tree/Tree';
import Node from './Node';

export default class Tree extends Component {

    componentDidMount() {
        
        console.log(new TreeCore())
    }

    render() {
        return (

            <div className='tree'> 
                
                                  

            </div>
        )

    }
}
