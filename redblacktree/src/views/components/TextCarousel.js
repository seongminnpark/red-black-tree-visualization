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

        this.props.data.map((item) => {
        
            const itemText = item.type + ' node ' + item.nodeId + 
                             ' at node ' + item.parentId + '.';

            console.log(itemText)
            items.push(
                <div className='carouselItem' 
                     key={item.type + item.nodeId}>
                    {itemText}
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
