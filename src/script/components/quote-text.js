'use strict'
import {create, replaceLineBreaks} from '../utils/trix';

export default class QuoteText{
    constructor(container, element){
        this.container = container;
        this.element = element;
        this.firstShow = true;
        this.build();
    }
    build(){
        this.textContainer= create('div', this.container, 'slide-text-content');
        this.textContent = create('div', this.textContainer, [this.element['text-type']]);
        this.text = replaceLineBreaks(this.element.text);
        this.textContent.innerHTML = this.text;
        if(this.element['text-size'] !== '0' ) this.adjustTextSize();
        console.log('ghost height', this.textContent.getBoundingClientRect().height);
        setTimeout(()=>{
            let ghostHeight = this.textContainer.getBoundingClientRect().height;
            this.textContainer.style.height = ghostHeight + 'px';
            this.textContent.innerHTML = '';
        }, 100)
        console.log('ghost height', this.textContainer.getBoundingClientRect().height);

    }
    adjustTextSize(){
        const baseSize = 1.4;
        const adjustSize = parseFloat(this.element['text-size']) *.2;
        const newSize = (baseSize + adjustSize).toFixed(1);
        this.textContent.style.fontSize = newSize+'em';
    }
    show(){
        if(this.firstShow){
            this.firstShow = false;
            let index = 0;
            setTimeout(()=>{
                let int = setInterval(()=>{
                    if(index < this.text.length){
                        index ++;
                        this.textContent.innerHTML = this.text.substr(0, index);
                    }else{
                        clearInterval(int);
                    }
                }, 10)
            }, 500)

        }else{
            this.textContent.style.opacity = '1';
        }
        
    }
    hide(){
        this.textContent.style.opacity = '0';
        this.textContainer.style.height = 'initial';
    }

}