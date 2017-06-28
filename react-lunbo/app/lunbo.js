
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
    // animate(obj,attr_json,_fn) {
    //     //清除定时器，防止函数未执行完而连续操作本函数
    //     clearInterval(obj.timer);
    //     obj.timer=setInterval(() => {
    //         let flag=true;  //清楚定时器的标识
    //         for(let attr in attr_json){
    //             let current=0;      
    //             if(attr=="opacity"){
    //                 let opacityNum = parseFloat(obj.style['opacity']).toFixed(2);
    //                 current = (opacityNum*100)||0;
    //             }else{  
    //                 current=parseInt(obj.style[attr]);
    //             }
    //             let step=(attr_json[attr]-current)/10; 

    //             step=step>0?Math.ceil(step):Math.floor(step);

    //             if(attr == "opacity"){
    //                 obj.style.opacity = parseFloat((current+step)/100).toFixed(2);
    //             }
    //             else if(attr=="zIndex"){
    //                 obj.style.zIndex=current+step;
    //             }
    //             else{
    //                 obj.style[attr]=(current+step)+"px";
    //             }

    //             if(current!=attr_json[attr]){ 
    //                 flag=false;
    //             }
    //         }
    //         if(flag){
    //             clearInterval(obj.timer);  
    //             if(_fn){
    //                 _fn()
    //             }
    //         }
    //     }, 13)
    // }
    /*
     * animate函数是动画封装函数
     * @para0  elem参数就是运动的对象
     * @para1  targetJSON参数就是运动的终点状态，可以写px，也可以不写px
     * @para2  time是运动总时间，毫秒为单位
     * @para3  tweenString缓冲描述词，比如"Linear"
     * @para4  callback是回调函数，可选
    */
    animate(elem , targetJSON , time , tweenString , callback){

        var Tween = { 
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
            //正弦的
            SineEaseIn: function(t, b, c, d) {
                return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
            },
            SineEaseOut: function(t, b, c, d) {
                return c * Math.sin(t / d * (Math.PI / 2)) + b;
            },
            SineEaseInOut: function(t, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
            },
            ExpoEaseIn: function(t, b, c, d) {
                return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
            },
            ExpoEaseOut: function(t, b, c, d) {
                return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
            },
            ExpoEaseInOut: function(t, b, c, d) {
                if (t == 0) return b;
                if (t == d) return b + c;
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            },
            CircEaseIn: function(t, b, c, d) {
                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            CircEaseOut: function(t, b, c, d) {
                return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
            },
            CircEaseInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            },
            ElasticEaseIn: function(t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                if (!a || a < Math.abs(c)) {
                    a = c;
                    var s = p / 4;
                } else var s = p / (2 * Math.PI) * Math.asin(c / a);
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            },
            ElasticEaseOut: function(t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                if (!a || a < Math.abs(c)) {
                    a = c;
                    var s = p / 4;
                } else var s = p / (2 * Math.PI) * Math.asin(c / a);
                return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
            },
            ElasticEaseInOut: function(t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d / 2) == 2) return b + c;
                if (!p) p = d * (.3 * 1.5);
                if (!a || a < Math.abs(c)) {
                    a = c;
                    var s = p / 4;
                } else var s = p / (2 * Math.PI) * Math.asin(c / a);
                if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
            },
            //冲过头系列
            BackEaseIn: function(t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            BackEaseOut: function(t, b, c, d, s ) {
                if (s == undefined) s = 1.70158;
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            BackEaseInOut: function(t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            },
            //弹跳系列
            BounceEaseIn: function(t, b, c, d) {
                return c - Tween.BounceEaseOut(d - t, 0, c, d) + b;
            },
            BounceEaseOut: function(t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                }
            },
            BounceEaseInOut: function(t, b, c, d) {
                if (t < d / 2) return Tween.BounceEaseIn(t * 2, 0, c, d) * .5 + b;
                else return Tween.BounceEaseOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        };
       
        var interval = 10;
        //强行给我们的动画元素增加一个isanimated的属性，是否正在运动
        elem.isanimated = true;
        //初始状态，放在origninalJSON里面
        var originalJSON = {};
        //变化的多少，放在deltaJSON里面
        var deltaJSON = {};

        for(var k in targetJSON){
            originalJSON[k] = parseFloat(elem.style[k]);
            //把每个targetJSON中的值都去掉px
            targetJSON[k] = parseFloat(targetJSON[k]);
            //变化量JSON
            deltaJSON[k] = targetJSON[k] - originalJSON[k];
        }

        //总执行函数次数：
        var maxFrameNumber = time / interval;
        //当前帧编号
        var frameNumber = 0;
        //这是一个临时变量一会儿用  
        var n;
        //定时器
        var timer = setInterval(function(){
            //要让所有的属性发生变化
            for(var k in originalJSON){
                //动：
                // n就表示这一帧应该在的位置：
                n = Tween[tweenString](frameNumber , originalJSON[k] , deltaJSON[k] , maxFrameNumber);
                //根据是不是opacity来设置单位
                if(k != "opacity"){
                    elem.style[k] = n + "px";
                }else{
                    elem.style[k] = n;
                }
            }

            //计数器
            frameNumber++;
            if(frameNumber == maxFrameNumber){
                for(var k in targetJSON){
                    if(k == "opacity"){
                        elem.style[k] = targetJSON[k];
                    }else if(k == 'zIndex'){
                        elem.style[k] = targetJSON[k];
                    }else{
                        elem.style[k] = targetJSON[k] + "px";
                    }
                }
                //停表
                clearInterval(timer);
                //拿掉是否在动属性，设为false
                elem.isanimated = false;
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


