import greet from './greet.js';
import xmldom from 'xmldom';

const welcome = greet('Thomas');
const doc = new DOMParser().parseFromString(welcome, 'text/html');

document.body.appendChild(doc.documentElement);