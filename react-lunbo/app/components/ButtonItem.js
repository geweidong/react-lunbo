// 三个按钮之一 
import React, {Component} from 'react';

export default class TabNavItem extends Component {
	render() {
		return (
			<a style={style.btnView} href="#">
				<img src={this.props.imgSrc} />
			</a>
		)
	}
}

const style = {
	btnView:{
	    display:'inline-block',
	    width:295, 
	    height:95,
	    marginLeft:10,
	    marginRight:10
	}
}