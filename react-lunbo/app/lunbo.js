
import style from './lunbo.css';
import ReactDOM from 'react-dom';
import React, {Component} from 'react'
import data from './config.js';

class LunBoControl extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            activeIndex:1,
            offsetDistance:this.props.direction == 'right' || this.props.direction == 'left' ? -this.props.imgWidth : -this.props.imgHeight,
            pause:false,
            flag:true
        };
    }

    componentWillMount() {
        this.direction = this.props.direction === 'left' || this.props.direction === 'right'? 'x' : 'y';
    }

    componentDidMount() {
        this.autoPlay();
    }

    componentWillUnmount() {
        clearTimeout(this.timeOuter);
        clearInterval(this.timer);
    }

    autoPlay() {
        switch(this.props.direction){
        case 'right' : 
            this.timerOuter=setTimeout(this.playRight,this.props.interval);
            this.direction='x';
            break;
        case 'left'  : 
            this.timerOuter=setTimeout(this.playLeft.bind(this),this.props.interval);
            this.direction='x';
            break;
        case 'top'   : 
            this.timerOuter=setTimeout(this.playLeft.bind(this),this.props.interval);
            this.direction='y';
            break;
        case 'bottom': 
            this.timerOuter=setTimeout(this.playRight,this.props.interval);
            this.direction='y';
            break;
        };
    }

    directionHandle() {
        if(this.direction === 'y'){
            return {top : this.state.offsetDistance+'px',width : this.props.imgWidth,height : this.props.imgHeight*(this.props.number+2),overflow:'hidden'};
        }else {

            return {left : this.state.offsetDistance+'px',width : this.props.imgWidth*(this.props.number+2),height : this.props.imgHeight};
        }
    }

    mouseHandle(e) {
        if(e.type === 'mouseover'){
            this.setState({
                pause : true
            });
        }else if(e.type === 'mouseleave'){
            this.setState({pause : false});
            this.autoPlay();
        }
    }
    /*圆点显示效果*/
    checkDots(index) {
        var activeIndex;
        if(this.state.activeIndex === this.props.number+1){
            activeIndex = 1;
        }else if(this.state.activeIndex === 0){
            activeIndex = this.props.number;
        }else {
            activeIndex = this.state.activeIndex;
        }
        return index+1 === activeIndex? style.active : style.dots;
    }

    dotsHover(index) {
        clearInterval(this.timer);
        this.setState({activeIndex:index+1});
        this.position();
    }

    /*向右或向下*/
    playRight(indexIn) {
        console.log(indexIn)
        if(this.state.flag){
            var index=indexIn?indexIn:this.state.activeIndex+1;
            this.setState({activeIndex:index});
            this.position();
        }
    }
    /*向左或向上*/
    playLeft(indexIn) {
        if(this.state.flag){
            var index=indexIn?indexIn:this.state.activeIndex-1;
            this.setState({activeIndex:index});
            this.position();
        }
    }
    /*运动效果*/
    position() {
        this.setState({flag:false});
        this.timer = setInterval(function(){
            if(this.direction === 'x'){
                var boxDistance = this.props.imgWidth;
            }else {
                var boxDistance = this.props.imgHeight;
            }
            var offsetDistance = this.state.offsetDistance;
            if(Math.abs(offsetDistance-(-boxDistance*this.state.activeIndex)) <= 0.09){
                offsetDistance = -boxDistance*this.state.activeIndex;
                clearInterval(this.timer);
                this.setState({flag:true});
                if(this.state.activeIndex > this.props.number){
                    offsetDistance = -boxDistance;
                    this.setState({activeIndex : 1});
                }else if(this.state.activeIndex === 0){
                    offsetDistance = -boxDistance*this.props.number;
                    this.setState({activeIndex : this.props.number});
                }
                this.setState({offsetDistance:offsetDistance});
                if(!this.state.pause){
                    this.autoPlay();
                }
            }else{
                offsetDistance = offsetDistance-(boxDistance*this.state.activeIndex-Math.abs(offsetDistance))/30;
                this.setState({offsetDistance:offsetDistance});
            }
        }.bind(this),10);
    }
    /*点击向左按钮*/
    left() {
        var oldIndex=this.state.activeIndex;
        this.playLeft(oldIndex-1);
    }
    /*点击向右按钮*/
    right() {
        var oldIndex=this.state.activeIndex;
        this.playRight(oldIndex+1);
    }
    render() {
        var _this = this;
        return (

            <div className={this.props.boxStyle} style={{width:this.props.imgWidth, height:this.props.imgHeight}} onMouseOver={this.mouseHandle.bind(this)} onMouseLeave={this.mouseHandle.bind(this)}>
            <span className="leftIcon" onClick={this.left.bind(this)}></span>
            <span className="rightIcon" onClick={this.right.bind(this)}></span>
            <div className="dots-wrap">
                {   
                    React.Children.map(this.props.children,function(elem,index){
                        return (<span className={_this.checkDots(index)} onMouseOver={_this.dotsHover.bind(_this,index)}></span>);
                    })
                }
            </div>
            <div style={{width:this.props.imgWidth,overflow: 'hidden'}}>
                <ul style={this.directionHandle()}>
                    {this.props.children[this.props.number-1]}
                    {this.props.children}
                    {this.props.children[0]}
                </ul>
            </div>
        </div>);
    }
}



LunBoControl.propTypes = {
    defaultActiveIndex:React.PropTypes.number,
    interval:React.PropTypes.number,
    direction:React.PropTypes.string,
    number:React.PropTypes.number,
    boxStyle:React.PropTypes.string,
    imgWidth:React.PropTypes.number.isRequired,
    imgHeight:React.PropTypes.number.isRequired
};
LunBoControl.defaultProps = {
    direction:'right',
    interval: 1000,
    boxStyle:'content'
}



var LunBoComponent = React.createClass({
    propsTypes : {
        lunboObject : React.PropTypes.object.isRequired,
        imgArray : React.PropTypes.array.isRequired,
        linkArray : React.PropTypes.array
    },
    render : function(){
        
        return (
                <LunBoControl interval={this.props.lunboObject.interval} number={this.props.lunboObject.number} boxStyle={this.props.lunboObject.boxStyle} imgWidth={this.props.lunboObject.imgWidth} imgHeight={this.props.lunboObject.imgHeight} direction={this.props.lunboObject.direction}>
                    {    
                        this.props.imgArray.map(function(item,index){
                            return <li key={index}><a href={this.props.linkArray[index]}><img width={this.props.lunboObject.imgWidth} height={this.props.lunboObject.imgHeight} src={item}/></a></li>;
                        }.bind(this))
                    }
                </LunBoControl>
        );
    }
});
module.exports = LunBoComponent;