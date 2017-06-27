const config = {
	imgArray: [
        require('./img/1.jpg'),
        require('./img/2.jpg'),
        require('./img/3.jpg'),
        require('./img/4.jpg'),
        require('./img/5.jpg'),
    ],
    linkArray: [
        "http://baidu.com",
        "http://baidu.com",
        "http://baidu.com",
        "http://baidu.com",
        "http://baidu.com",

    ],
    lunboObject: {
        "width":1000,           //幻灯片的宽度
        "height":270,               //幻灯片的高度
        "imgWidth":640,  //幻灯片第一帧的宽度
        "imgHeight":270, //幻灯片第一帧的高度
        "interval": 1500,
        "scale":0.9, //记录显示比例关系
        "direction": "left",
        "number": 5,
        "autoPlay":false,
    }
};

export default config;