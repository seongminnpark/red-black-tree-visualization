import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Styles/TextCarousel.css';

class TextCarousel extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        var items = [];

        this.props.data.map((item, i) => {
        
            items.push(
                <div className='carouselItem' 
                     key={'ci' + i.toString()}>
                    {item}
                </div>
            )
        });

        return (
            <div className='textCarousel'>

                <div className='cursor'>
                    >
                </div>
                
                <div className='textContainer'>
                    { items }
                </div>
               
            </div>
        )
    }

    

}


TextCarousel.propTypes = {
    active: PropTypes.number,
    data: PropTypes.array
};

export default TextCarousel;
