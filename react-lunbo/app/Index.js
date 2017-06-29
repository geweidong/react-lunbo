
import React, {Component} from 'react';
import {render} from 'react-dom';
import data from './data/LunBoControlConfig.js';
import main from  './css/main.css';

// 轮播组件
import LunBoControl from './components/LunBoControl';
// 导航组件
import TabNavItem from './components/TabNavItem';
// 按钮组件
import ButtonItem from './components/ButtonItem';

export default class Index extends Component {
	constructor(props){
		super(props);
		this.state = {
			hasLoaded: false
		}
	}

	componentDidMount() {
		// 模拟请求后台数据
		fetch('http://route.showapi.com/582-2?typeId=1&page=1&showapi_appid=29400&showapi_sign=e7977541307547beab3e4aa033adb78f')
            .then((response) => response.json())
            .then((data) => {
                if(data){

                    this.setState({
                        hasLoaded: true
                    });
                    
                }
            })
            .catch((err) => {
            	console.log(err)
            })
            .done();
	}

	render() {
		if(this.state.hasLoaded){
			return (
				<div className={main.mainPage}>
	                <div className={main['mark-tab']}>
	                    <TabNavItem />
	                </div>
	                <div className={main['ad-img']}>
	                    <LunBoControl lunboObject={data.lunboObject} imgArray={data.imgArray} title={data.title} linkArray={data.linkArray} />
	                </div>
	                <div className={main['btn-box']}>
	                    <ButtonItem imgSrc={require('./img/btn01.png')} />
	                    <ButtonItem imgSrc={require('./img/btn02.png')} />
	                    <ButtonItem imgSrc={require('./img/btn03.png')} />
	                </div>
	                <div className={main['copyright']}>文网游备字〔2010〕C-CBG 002号</div>
	            </div>
			)
		}else{
			return (
				<div className={main.mainPage}>
					<div style={{textAlign: 'center',marginTop: 300}}>
						<img src={require('./img/loading.gif')} />
					</div>
				</div>
			)
		}
		
	}
}