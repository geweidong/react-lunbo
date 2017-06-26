//main.js 
import React from 'react';
import {render} from 'react-dom';
import data from './config.js';

/*引用按以下方式*/
var LunBoComponent = require('./lunbo.js');
render(<LunBoComponent lunboObject={data.lunboObject} imgArray={data.imgArray} linkArray={data.linkArray}/>, document.getElementById('root'));


