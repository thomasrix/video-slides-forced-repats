'use strict'
import {create} from '../utils/trix';
import './scroll-slide.scss';
import VideoLoop from './video-loop';
import VideoClip from './video-clip';
import TextSlide from './text-slide';

export default class ScrollSlide{
    constructor(id, wrapper, parent, element){
        this.id = id;
        this.wrapper = wrapper;
        this.parent = parent;
        this.element = element;
        this.init();
    }
    init(){
        this.types = {
            'video-loop':VideoLoop,
            'video-sync':VideoClip,
            'text-slide':TextSlide
        }
        this.build();
    }
    build(){
        this.displayContent = new this.types[this.element.type](this.id, this.wrapper, this.element, this.parent);
        this.shown = false;
        this.content  = this.displayContent.content;

        if(this.displayContent.soundVideo) this.parent.soundVideos.push(this.displayContent.videoNode);
        if(this.displayContent.hasVideo) this.parent.allVideoSlides.push(this);
        
        let scrollControlContainer = create('div', this.parent.container, 'scroll-control-container');
        this.scrollController = create('div', scrollControlContainer, 'scroll-controller');
        this.scrollController.style.backgroundColor = this.element.color;
        this.scrollController.object = this;
        this.scrollController.id = 's'+this.id;
        
    }
    show(){
        this.content.classList.add('shown');
        this.shown = true;
        this.displayContent.show();
    }
    hide(){
        this.displayContent.hide();
        this.shown = false;
        this.content.classList.add('fade');
        
        setTimeout(()=>{
            this.content.classList.remove('shown', 'fade')
        }, 320)
    }
    
}