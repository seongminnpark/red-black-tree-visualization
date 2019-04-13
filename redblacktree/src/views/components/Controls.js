import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import left from '../../images/left.png';
import right from '../../images/right.png';

import './Styles/Controls.css';

function NextArrow(props) {
		  const { className, style, onClick } = props;
		  return (
			      <img src={right}
			  style={{ ...style, display: "block"}}
			  onClick={onClick}
			      />
			    );
	}

	function PrevArrow(props) {
		  const { className, style, onClick } = props;
		  return (
			      <img src={left}
			  style={{ ...style, display: "block"}}
			  onClick={onClick}
			      />
			    );
	}

class Controls extends Component {

	render() {
		var items = [];

		var settings = {
			dots: false, 
			infinite: false, 
			speed: 500,
			vertical: true,
			className: 'controls',
			arrows: true,
			nextArrow: <NextArrow/>,
			prevArrow: <PrevArrow/>,
		};

		this.props.data.map((item, i) => {
			items.push(
				<div
					key={'ci' + i.toString()}>
				{item}
				</div>)

		});

		return (
			<div>
				<Slider {...settings}>
					{items}
				</Slider>
			</div>
		)
	}
}

Controls.propTypes = {
	active: PropTypes.number, 
	data: PropTypes.array
};

export default Controls;
