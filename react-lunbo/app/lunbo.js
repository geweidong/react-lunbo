
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
            activeIndex: 0
        };
        this.itemsArr = []
    }

    componentWillMount() {
        clearInterval(this.timer);
    }
    
    // 缓动动画
    animate(obj,attr_json) {  

        this.timer=setInterval(function(){
            
            /*遍历并操作json数据集合对象中样式属性和值*/
            for(var attr in attr_json){
                var current=0;      
                if(attr=="opacity"){
                    
                    current=Math.round(parseInt(obj.style[attr]*100))||0;
                }else{  
                    current=parseInt(obj.style[attr]);

                }
                var step=(attr_json[attr]-current)/10;
                
                step=step>0?Math.ceil(step):Math.floor(step);

                
                if(attr=="opacity"){
                        obj.style.opacity=(current+step)/100;
                }
                else if(attr=="zIndex"){
                        obj.style.zIndex=current+step;
                }
                else{
                    obj.style[attr]=(current+step)+"px";
                }
                
            }
           
        }.bind(this),20)
       
    }  

    componentDidMount() {
       for(var i=0;i<this.props.lunboObject.number;i++){
            console.log(234234)
            this.itemsArr.push(findDOMNode(this.refs['items'+(i)]));
       }
    }

    playRight() {
        this.autoPlay();
    }

    autoPlay() {
        let len = this.itemsArr.length;
        // let next= this.itemsArr[0];
        this.itemsArr.forEach((item, index) => {
            let self = item;
            let next = this.itemsArr[index+1];
            if(index == 4){
                next = this.itemsArr[0];
            }
            console.log(next,index)
            let left = parseInt(next.style.left);
            let width = parseInt(next.style.width);
            let height = parseInt(next.style.height);
            console.log(left)
            this.animate(self, {left:left,width:width,height:height});
            // next = this.itemsArr[index+1];
        })
    }

    componentWillUnmount() {
        
    }
    // 点击左侧按钮
    clickPrev() {
       this.playRight();

    }
    // 渲染item的样式style
    renderstyle(index) {
        // this.setState({
        //     activeIndex: index
        // });

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

    render() {
        const btnWidth = (this.props.lunboObject.width-this.props.lunboObject.imgWidth) / 2;
        
        return (
            <div className={style['poster-main']} style={{width:this.props.lunboObject.width}}>
                <div className={style["poster-prev-btn"]} style={{width:btnWidth}} onClick={this.clickPrev.bind(this)}></div>
                <div className={style['dots-wrap']}>
                    
                </div>
               
                <ul className={style['poster-list']} style={{width:this.props.lunboObject.width}}>
                   {
                        this.props.imgArray.map(function(item,index){
                            return <li ref={'items'+index} className={style['poster-item']} style={this.renderstyle(index)} key={index}><a href={this.props.linkArray[index]}><img width="100%" height="100%" src={item}/></a></li>;

                        }.bind(this))
                   }
                </ul>
                
                <div className={style["poster-next-btn"]} style={{width:btnWidth}}></div>
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



