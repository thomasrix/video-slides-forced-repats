'use strict'
import {create} from '../utils/trix';
import './scroll-slide.scss';
import VideoLoop from './video-loop';
import VideoClip from './video-clip';
import TextSlide from './text-slide';
import NormalText from './normal-text';
import QuoteText from './quote-text';

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
        this.textTypes = {
            'no-text':NormalText,
            'normal':NormalText,
            'header':NormalText,
            'quote':QuoteText
        }
        this.build();
    }
    build(){
        this.content  = create('div', this.wrapper, 'scroll-slide-container');
        
        if(this.element['mobil-bg-image'] !== '' || this.element['desktop-bg-image'] !== ''){
            this.addPicture();
        }
        
        this.displayContent = new this.types[this.element.type](this.id, this.content, this.element, this.parent);
        this.shown = false;
        
        console.log('color', this.element['bg-color']);
        if(this.element['bg-color'] !== '') this.content.style.backgroundColor = this.element['bg-color'];
        
        
        if(this.displayContent.soundVideo) this.parent.soundVideos.push(this.displayContent.videoNode);
        if(this.displayContent.hasVideo) this.parent.allVideoSlides.push(this);
        
        if(this.element.text !== ''){
            this.addText();
        }
        
        let scrollControlContainer = create('div', this.parent.container, 'scroll-control-container');
        this.scrollController = create('div', scrollControlContainer, 'scroll-controller');
        this.scrollController.style.backgroundColor = this.element.color;
        this.scrollController.object = this;
        this.scrollController.id = 's'+this.id;
        
    }
    addPicture(){
        let p = create('picture', this.content, 'background-picture');
        let ms = create('source', p);
        ms.media = '(orientation: portrait)';
        ms.srcset = `${process.env.EXTERNAL_ASSETS_PATH}images/${this.element['mobil-bg-image']}`;
        let ds = create('source', p);
        ds.media = '(orientation: landscape)';
        ds.srcset = `${process.env.EXTERNAL_ASSETS_PATH}images/${this.element['desktop-bg-image']}`;
        let i = create('img', p);
        i.src = `${process.env.EXTERNAL_ASSETS_PATH}images/${this.element['desktop-bg-image']}`;
    }
    addText(){
        this.textElement = new this.textTypes[this.element['text-type']](this.content, this.element);
    }
    show(){
        this.content.classList.add('shown');
        this.shown = true;
        this.displayContent.show();
        if(this.textElement !== undefined) this.textElement.show();
    }
    hide(){
        this.displayContent.hide();
        this.shown = false;
        this.content.classList.add('fade');
        if(this.textElement !== undefined) this.textElement.hide();
        
        setTimeout(()=>{
            this.content.classList.remove('shown', 'fade')
        }, 320)
    }
    
}