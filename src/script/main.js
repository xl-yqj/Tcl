import 'jquery';

import '../css/cartlist.css';
import '../css/index1.css';
import '../css/details.css';
import '../css/login.css';
import '../css/registry.css';


import { IndexRender } from './indexRender.js';
new IndexRender().init();

import { DetailsRender } from './details.js';
new DetailsRender().init();
import { Cartlist } from './cartlist.js';
new Cartlist().init();
import { Registry } from './registry.js';
new Registry().init();