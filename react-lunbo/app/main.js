//main.js 
import React from 'react';
import {render} from 'react-dom';
import data from './config.js';

/*引用按以下方式*/
import LunBoControl from './lunbo.js';

render(<LunBoControl lunboObject={data.lunboObject} imgArray={data.imgArray} linkArray={data.linkArray} />, document.getElementById('root'));




