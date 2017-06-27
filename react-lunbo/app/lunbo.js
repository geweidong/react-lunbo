
import style from './lunbo.css';
import {findDOMNode} from 'react-dom';
import React, {Component} from 'react'
import data from './config.js';

export default class LunBoControl extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            // 中间值
            middleIndex: Math.ceil(this.props.number / 2),
            // activeIndex: 0,
            pause: false,
            rotateFlag: true,
        };

        this.itemsArr = [];
        this.activeIndex = 0;
    }

    componentWillMount() {
        clearInterval(this.timer);
    }
    animate(obj,attr_json,_fn) {
        //清除定时器，防止函数未执行完而连续操作本函数
        clearInterval(obj.timer);
        obj.timer=setInterval(function(){
            let flag=true;  //清楚定时器的标识
            for(let attr in attr_json){
                let current=0;      
                if(attr=="opacity"){
                    
                    current=Math.round(obj.style[attr]*100)||0;
                }else{  //其他属性值
                    current=parseInt(obj.style[attr]);
                }
                let step=(attr_json[attr]-current)/10;
                step=step>0?Math.ceil(step):Math.floor(step);
                if(attr == "opacity"){
                    obj.style.opacity = (current+step)/100;
                }
                else if(attr=="zIndex"){
                        obj.style.zIndex=current+step;
                }
                else{
                    obj.style[attr]=(current+step)+"px";
                }

                if(current!=attr_json[attr]){ 
                    flag=false;
                }
            }
            if(flag){
                clearInterval(obj.timer);  
                if(_fn){
                    _fn()
                }
            }
            
        },20)
    }

    componentDidMount() {
       for(let i=0;i<this.props.lunboObject.number;i++){
            this.itemsArr.push(findDOMNode(this.refs['items'+(i)]));
       };
        this.autoPlay();
    }

    playCarousel(direction) {
            let len = this.itemsArr.length;

            if(direction == 'left'){
                this.activeIndex--;
                if(this.activeIndex < 0){
                    this.activeIndex = (len-1);
                }
                this.itemsArr.forEach((item, index) => {
                    let self = item;
                    let next = this.itemsArr[index+1];
                    if(index == (len-1)){
                        next = this.itemsArr[0];
                    }
                    
                    let left = parseInt(next.style.left);
                    let width = parseInt(next.style.width);
                    let height = parseInt(next.style.height);
                    let zIndex = parseInt(next.style.zIndex);
                    let opacity = (next.style.opacity)*100;

                    this.animate(self, {left:left,width:width,height:height,zIndex:zIndex,opacity:opacity},() => {
                        this.setState({
                            rotateFlag: true,
                        })
                    });
                })
            }else if(direction == 'right'){
                this.activeIndex++;
                if(this.activeIndex > (len-1)){
                    this.activeIndex = 0;
                }
                this.itemsArr.forEach((item, index) => {

                    let self = item;
                    let prev = this.itemsArr[index-1];
                    if(index == 0){
                        prev = this.itemsArr[len-1];
                    }
                    
                    let left = parseInt(prev.style.left);
                    let width = parseInt(prev.style.width);
                    let height = parseInt(prev.style.height);
                    let zIndex = parseInt(prev.style.zIndex);
                    let opacity = (prev.style.opacity)*100;

                    this.animate(self, {left:left,width:width,height:height,zIndex:zIndex,opacity:opacity},() => {
                        
                        this.setState({
                            rotateFlag: true,
                        })
                    });
                })
            }
            
    }
    // 自己动
    autoPlay() {
        this.timer = setInterval(() => {
            this.clickNext()
        },this.props.lunboObject.interval);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }
    // 点击左侧按钮
    clickPrev() {
        if(this.state.rotateFlag){
            this.setState({
                rotateFlag: false
            })
            this.playCarousel('left');
        }
       
    }
    // 点击右侧按钮
    clickNext() {
        if(this.state.rotateFlag){
            this.setState({
                rotateFlag: false
            })
            this.playCarousel('right');
        }
        
    }
    // 渲染item的样式style
    renderstyle(index) {

        const middleIndex = Math.floor(this.props.lunboObject.number / 2);
        const btnWidth = (this.props.lunboObject.width-this.props.lunboObject.imgWidth) / 2;
        const gap = btnWidth/middleIndex;
        let Imgleft;
        let Imgright;
        let scale  = 1;
        let zIndex = 100;
        let opacity = 1;

        if(index <= middleIndex){
            // 右侧图片
            scale = Math.pow(0.9, (index));
            Imgleft = this.props.lunboObject.width - (middleIndex-index)*gap - this.props.lunboObject.imgWidth*scale;
            zIndex=middleIndex+1 - index;
            opacity=1/++index;

        }else if(index > middleIndex){

            // 左侧图片
            scale = Math.pow(0.9, (this.props.lunboObject.number-index));
            Imgleft = (index-(middleIndex+1))*gap;
            zIndex=index-middleIndex;
            opacity=(1-1/++index);
        }

        return {
            width: this.props.lunboObject.imgWidth*scale,
            height: this.props.lunboObject.imgHeight*scale, 
            left:Imgleft,
            zIndex:zIndex,
            opacity:opacity
        }
    }

    // 鼠标移入移出
    mouseHandle(e) {
        if(e.type === 'mouseover'){
            clearInterval(this.timer);
            this.setState({pause : true});
        }else if(e.type === 'mouseleave'){
            this.setState({pause : false});
            this.autoPlay();
        }
    }

    // 小圆点样式
    checkDots(index) {
        return index === this.activeIndex? style.active : style.dots;
    }

    // 点击小圆点点
    clickDots(index) {
        
    }

    render() {
        const btnWidth = (this.props.lunboObject.width-this.props.lunboObject.imgWidth) / 2;
        
        return (
            <div className={style['poster-main']} style={{width:this.props.lunboObject.width}} onMouseOver={this.mouseHandle.bind(this)} onMouseLeave={this.mouseHandle.bind(this)}>
                <div className={style["poster-prev-btn"]} style={{width:btnWidth}} onClick={()=>this.clickPrev()}></div>
                <div className={style['dots-wrap']}>
                    {/*这里放置小圆点点*/}
                    {
                        this.props.imgArray.map(function(item,index){
                            return <span key={index} onClick={()=>this.clickDots(index)} className={this.checkDots(index)}></span>;

                        }.bind(this))
                    }
                </div>
                <ul className={style['poster-list']} style={{width:this.props.lunboObject.width}}>
                   {
                        this.props.imgArray.map(function(item,index){
                            return <li ref={'items'+index} className={style['poster-item']} style={this.renderstyle(index)} key={index}><a href={this.props.linkArray[index]}><img width="100%" height="100%" src={item}/></a></li>;

                        }.bind(this))
                   }
                </ul>
                <div className={style["poster-next-btn"]} style={{width:btnWidth}} onClick={() => this.clickNext()}></div>
            </div>);
    }
}



LunBoControl.propTypes = {
    // defaultActiveIndex:React.PropTypes.number,
    // interval:React.PropTypes.number,
    // direction:React.PropTypes.string,
    // number:React.PropTypes.number,
    // boxStyle:React.PropTypes.string,
    // imgWidth:React.PropTypes.number.isRequired,
    // imgHeight:React.PropTypes.number.isRequired
};
LunBoControl.defaultProps = {
    // direction:'right',
    // interval: 1000,
    // boxStyle:'content'
}



