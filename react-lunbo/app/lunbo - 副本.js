
import style from './lunbo.css';
import {findDOMNode} from 'react-dom';
import React, {Component} from 'react'
import data from './config.js';

export default class LunBoControl extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            activeIndex: 0,
            dotsIndex: null
        };
        this.itemsArr = [];
        this.LOOPNUM = this.props.lunboObject.number;
    }

    componentWillMount() {
        clearInterval(this.timer);
    }
    

    componentDidMount() {
       for(let i=0;i<this.props.lunboObject.number;i++){
            this.itemsArr.push(findDOMNode(this.refs['items'+(i)]));
       };
        this.autoPlay();
    }
    
    componentWillUnmount() {
        clearInterval(this.timer);
        this.itemsArr = [];
    }

    // 缓动函数
    animate(obj,attr_json,_fn) {
        //清除定时器，防止函数未执行完而连续操作本函数
        clearInterval(obj.timer);
        obj.timer=setInterval(() => {
            let flag=true;  //清楚定时器的标识
            for(let attr in attr_json){
                let current=0;      
                if(attr=="opacity"){
                    let opacityNum = parseFloat(obj.style['opacity']).toFixed(2);
                    current = (opacityNum*100)||0;
                }else{  
                    current=parseInt(obj.style[attr]);
                }
                let step=(attr_json[attr]-current)/10; 

                step=step>0?Math.ceil(step):Math.floor(step);

                if(attr == "opacity"){
                    obj.style.opacity = parseFloat((current+step)/100).toFixed(2);
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
        }, 13)
    }

    // 变化的属性
    rotateStyle(self, next) {
            let left = Number.parseInt(next.style.left);
            let top = Number.parseInt(next.style.top);
            let width = Number.parseInt(next.style.width);
            let height = Number.parseInt(next.style.height);
            let zIndex = Number.parseInt(next.style.zIndex);
            let opacity = (parseFloat(next.style.opacity).toFixed(2))*100;
            this.animate(self, {left:left,width:width,height:height,zIndex:zIndex,opacity: opacity,top:top},() => {
                ++this.LOOPNUM ;
            });
    }

    // 点击左侧按钮
    clickPrev() {
        if(this.LOOPNUM == this.props.lunboObject.number){
            this.LOOPNUM=0;
            this.playCarousel('left');
        }
    }
    // 点击右侧按钮
    clickNext() {
        if(this.LOOPNUM == this.props.lunboObject.number){
            this.LOOPNUM=0;
            this.playCarousel('right');
        }
        
    }
  
    // 鼠标移入移出
    mouseHandle(e) {
        if(e.type === 'mouseover'){
            clearInterval(this.timer);
        }else if(e.type === 'mouseleave'){
            this.autoPlay();
        }
    }

    // 小圆点样式
    checkDots(index) {
        return index === this.state.activeIndex? style.active : style.dots;
    }

    // 木马旋转
    playCarousel(direction) {
            let len = this.itemsArr.length;
            if(direction == 'left'){
                this.setState({
                    activeIndex: this.state.activeIndex-1
                }, () => {
                    if(this.state.activeIndex < 0){
                        this.setState({
                            activeIndex: (len-1)
                        })
                       
                    }
                })
               

                this.itemsArr.forEach((item, index) => {
                    let self = item;
                    let next = this.itemsArr[index+1];
                    if(index == (len-1)){
                        next = this.itemsArr[0];
                    }
                    
                    this.rotateStyle(self, next);
                })
                
            }else if(direction == 'right'){
                this.setState({
                    activeIndex: this.state.activeIndex+1
                }, () => {
                    if(this.state.activeIndex > (len-1)){
                        this.setState({
                            activeIndex: 0
                        })
                    }
                })
                
                this.itemsArr.forEach((item, index) => {

                    let self = item;
                    let prev = this.itemsArr[index-1];
                    if(index == 0){
                        prev = this.itemsArr[len-1];
                    }
                    
                    this.rotateStyle(self, prev);
                })
            }
    }

    // 自己动
    autoPlay() {
        if(this.props.lunboObject.autoPlay){
            this.timer = setInterval(() => {
                this.clickNext()
            },this.props.lunboObject.interval);
        }
    }

    // 点击小圆点点
    clickDots(index) {
        if(this.LOOPNUM == this.props.lunboObject.number){
            this.LOOPNUM = 0;
            this.setState({
                dotsIndex: index,
            }, () => {
                this.gotoDotView()
            })
        }
        
    }


    // 点击小圆点动
    gotoDotView() {
        if(this.state.dotsIndex == this.state.activeIndex){
            return ;
        }else{
            let len = this.itemsArr.length;
            // 运动到小圆点指示的位置
            if(this.state.dotsIndex - this.state.activeIndex > 0){
                // 如果点击在右侧 向左运动
                const dotsDiff = this.state.dotsIndex - this.state.activeIndex;
                this.setState({
                    activeIndex: this.state.activeIndex + dotsDiff
                })
                
                this.itemsArr.forEach((item, index) => {
                    let self = item;
                    let nextIndex = Number.parseInt(index-dotsDiff);
                    if(nextIndex < 0){
                        nextIndex = nextIndex+len;
                    }
                    let next = this.itemsArr[nextIndex];
                    this.rotateStyle(self, next);
                })
            }else{
                // 如果点击在左侧
                const dotsDiff = this.state.activeIndex - this.state.dotsIndex;
                this.setState({
                    activeIndex: this.state.activeIndex - dotsDiff
                })

                this.itemsArr.forEach((item, index) => {
                    let self = item;
                    let prevIndex = Number.parseInt(index+dotsDiff);
                    if(prevIndex >= len){
                        prevIndex = prevIndex-len;
                    }
                    
                    let prev = this.itemsArr[prevIndex];
                    this.rotateStyle(self, prev);
                })
            }
        }
    }

    // 渲染item的样式style
    renderstyle(index) {

        const middleIndex = Math.floor(this.props.lunboObject.number / 2);
        const btnWidth = (this.props.lunboObject.width-this.props.lunboObject.imgWidth) / 2;
        const gap = btnWidth/middleIndex;
        let Imgleft;
        let ImgTop;
        let scale;
        let zIndex;
        let opacity;

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
            zIndex = index-middleIndex;
            opacity = 1 - middleIndex/index;
        }

        switch(this.props.lunboObject.vertical){
            case 'bottom':
                ImgTop = parseInt(this.props.lunboObject.height - this.props.lunboObject.imgHeight*scale);
            break;
            case 'center':
                ImgTop = parseInt((this.props.lunboObject.height - this.props.lunboObject.imgHeight*scale)/2);
            break;
            default:

        }

        return {
            width: parseInt(this.props.lunboObject.imgWidth*scale),
            height: parseInt(this.props.lunboObject.imgHeight*scale), 
            left:parseInt(Imgleft),
            zIndex:zIndex,
            opacity:opacity,
            top:ImgTop
        }
    }

    render() {
        const btnWidth = (this.props.lunboObject.width-this.props.lunboObject.imgWidth) / 2;
        
        return (
            <div className={style['poster-main']} style={{width:this.props.lunboObject.width}} onMouseOver={this.mouseHandle.bind(this)} onMouseLeave={this.mouseHandle.bind(this)}>
                <div className={style["poster-prev-btn"]} style={{width:btnWidth}} onClick={()=>this.clickPrev()}></div>
                <div className={style['dots-wrap']} style={{marginLeft: -Number.parseInt(24*this.props.lunboObject.number / 2 + 4)}}>
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


