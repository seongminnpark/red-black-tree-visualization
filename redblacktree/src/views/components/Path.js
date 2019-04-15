import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TweenMax } from 'gsap';

//import './Styles/Node.css';

class Path extends Component {

   componentDidUpdate(prevProps, prevState) {
       const el = this.container;
       TweenMax.fromTo(el, 0.3, 
           {attr:{x1: this.props.prevFromX, y1: this.props.prevFromY,
            y2: this.props.prevToX, y2h: this.props.prevToY}},

           {attr:{x1: this.props.fromX, y1: this.props.fromY,
            y2: this.props.toX, y2h: this.props.toY}}
       );
   }

    componentDidMount() {
        const el = this.container;

        TweenMax.fromTo(el, 0.3, 
           {attr:{x1: this.props.fromX, y1: this.props.fromY,
            y2: this.props.toX, y2h: this.props.toY},
           opacity: 0},

           {attr:{x1: this.props.fromX, y1: this.props.fromY,
            y2: this.props.toX, y2h: this.props.toY},
           opacity: 1}
       );

    }
    
    render () {

        var styles = {
            position: 'absolute',
            stroke:'#000000'
        }

        return (

            <svg className='path' 
                ref={c => this.container = c}
                style={{
                    position:'absolute'}}
            >

            <line style={styles} 
                x1={this.props.fromX} 
                y1={this.props.fromY} 
                x2={this.props.toX} 
                y2={this.props.toY}/>

            </svg>
        )
    }
    

}


export default Path;
