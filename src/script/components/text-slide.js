'use strict'

import {create, replaceLineBreaks} from '../utils/trix';
import './video.scss';

export default class TextSlide{
    constructor(id, wrapper, element){
        this.wrapper = wrapper;
        this.element = element;
        this.init();
    }
    init(){
        this.build();
    }
    build(){
        this.content = create('div', this.wrapper, 'scroll-slide-container');
        this.content.style.backgroundColor = this.element['bg-color'];

        
        let query = window.matchMedia('(min-width: 501px)');
        
        this.setSource(query);
        query.addListener(this.setSource.bind(this));
        
        if(this.element.text !== ''){
            this.textContent = create('div', this.content, ['slide-text-content', this.element['text-type']]);
            this.textContent.innerHTML = replaceLineBreaks(this.element.text);
            if(this.element['text-size'] !== '0' ) this.adjustTextSize();
        }
    }
    adjustTextSize(){
        const baseSize = 1.4;
        const adjustSize = parseFloat(this.element['text-size']) *.2;
        const newSize = (baseSize + adjustSize).toFixed(1);
        this.textContent.style.fontSize = newSize+'em';
    }

    setSource(q){
    }
    show(){
        console.log('show text')
    }
    hide(){
    }
    testSlideContent(){
        return `TextSlide<br/>Slide ${this.element.id}`;
    }
}