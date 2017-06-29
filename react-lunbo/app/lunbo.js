
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

    /*
     * animate函数是动画封装函数
     * @para0  elem参数就是运动的对象
     * @para1  targetJSON参数就是运动的终点状态，可以写px，也可以不写px
     * @para2  time是运动总时间，毫秒为单位
     * @para3  tweenString缓冲描述词，比如"Linear"
     * @para4  callback是回调函数，可选
    */
    animate(elem , targetJSON , time , tweenString , callback){
        // 缓冲描述词集合
        const Tween = { 
            Linear: function(t, b, c, d) {
                return c * t / d + b;
            },
            //二次的
            QuadEaseIn: function(t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            QuadEaseOut: function(t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            },
            QuadEaseInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t + b;
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            },
            //三次的
            CubicEaseIn: function(t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            CubicEaseOut: function(t, b, c, d) {
                return c * ((t = t / d - 1) * t * t + 1) + b;
            },
            CubicEaseInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            },
            //四次的
            QuartEaseIn: function(t, b, c, d) {
                return c * (t /= d) * t * t * t + b;
            },
            QuartEaseOut: function(t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            },
            QuartEaseInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
                return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
            },
            QuartEaseIn: function(t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b;
            },
            QuartEaseOut: function(t, b, c, d) {
                return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
            },
            QuartEaseInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
            },
        };
       
        let interval = 15;
        //初始状态，放在origninalJSON里面
        let originalJSON = {};
        //变化的多少，放在deltaJSON里面
        let deltaJSON = {};

        for(let k in targetJSON){
            originalJSON[k] = parseFloat(elem.style[k]);
            //把每个targetJSON中的值都去掉px
            targetJSON[k] = parseFloat(targetJSON[k]);
            //变化量JSON
            deltaJSON[k] = targetJSON[k] - originalJSON[k];
        }

        //总执行函数次数：
        let maxFrameNumber = time / interval;
        //当前帧编号
        let frameNumber = 0;
        //这是一个临时变量一会儿用  
        let tween;
        //定时器
        let timer = setInterval(() => {
            //要让所有的属性发生变化
            for(let k in originalJSON){
                // tween就表示这一帧应该在的位置：
                tween = Tween[tweenString](frameNumber , originalJSON[k] , deltaJSON[k] , maxFrameNumber);
                //根据是不是opacity来设置单位
                if(k != "opacity"){
                    elem.style[k] = tween + "px";
                }else{
                    elem.style[k] = tween;
                }
            }

            //计数器
            frameNumber++;
            if(frameNumber == maxFrameNumber){
                for(let k in targetJSON){
                    if(k == "opacity" || k == "zIndex"){
                        elem.style[k] = targetJSON[k];
                    }else{
                        elem.style[k] = targetJSON[k] + "px";
                    }
                }
                clearInterval(timer);
                //拿掉是否在动属性，设为false
                callback && callback();
            }
        },interval);
    }
    // 变化的属性
    rotateStyle(self, next) {
            let left = Number.parseInt(next.style.left);
            let top = Number.parseInt(next.style.top);
            let width = Number.parseInt(next.style.width);
            let height = Number.parseInt(next.style.height);
            let zIndex = Number.parseInt(next.style.zIndex);
            let opacity = parseFloat(next.style.opacity).toFixed(2);
            this.animate(self, {left:left,width:width,height:height,zIndex:zIndex,opacity: opacity,top:top}, 300, 'QuadEaseIn', () => {
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


