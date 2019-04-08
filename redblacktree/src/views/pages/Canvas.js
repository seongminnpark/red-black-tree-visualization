import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tree from '../components/Tree';

class Canvas extends Component {

    render() {
        return (
            <div className='canvas'> 
            
                <Tree/>
            
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

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)
