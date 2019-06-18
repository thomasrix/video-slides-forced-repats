'use strict'
import {create, replaceLineBreaks} from '../utils/trix';

export default class QuoteText{
    constructor(container, element){
        this.container = container;
        this.element = element;
        this.build();
    }
    build(){
        this.textContainer= create('div', this.container, 'slide-text-content');
        this.textContent = create('div', this.textContainer, [this.element['text-type']]);
        this.textContent.innerHTML = replaceLineBreaks(this.element.text);
        if(this.element['text-size'] !== '0' ) this.adjustTextSize();

    }
    adjustTextSize(){
        const baseSize = 1.4;
        const adjustSize = parseFloat(this.element['text-size']) *.2;
        const newSize = (baseSize + adjustSize).toFixed(1);
        this.textContent.style.fontSize = newSize+'em';
    }
    show(){

    }
    hide(){
        
    }

}