// 导航  -- 赛事活动
import React, {Component} from 'react';

export default class TabNavItem extends Component {
	render() {
		return (
			<span style={style.tab1}>
				<img src={require("../img/tab1.png")} />
			</span>
		)
	}
}

const style = {
	tab1:{
	    width: 120,
	    height: 40,
	    display: 'block',
	}
}