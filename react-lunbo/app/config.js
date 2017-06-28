const config = {
	imgArray: [
        require('./img/1.jpg'),
        require('./img/2.jpg'),
        require('./img/3.jpg'),
    ],
    linkArray: [
        "http://baidu.com",
        "http://baidu.com",
        "http://baidu.com",
    ],
    lunboObject: {
        "width":1000,//幻灯片的宽度
        "height":270,//幻灯片的高度
        "imgWidth":800,//幻灯片第一帧的宽度
        "imgHeight":270,//幻灯片第一帧的高度
        "interval": 1500,//幻灯片滚动的间隔时间
        "scale":0.8, //记录显示比例关系
        "number":3,
        "autoPlay":false,
        "vertical":"center"
    }
};

export default config;