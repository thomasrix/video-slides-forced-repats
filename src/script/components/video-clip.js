'use strict'

import {create, selectAll} from '../utils/trix';
import {startButton} from './svgs';

export default class VideoClip{
    constructor(id, wrapper, element, root){
        this.id = id;
        this.wrapper = wrapper;
        this.element = element;
        this.root = root;
        this.hasVideo = true;
        this.soundVideo = true;
        this.init();
    }
    init(){
        this.build();
        // addNodeListForEach();
    }
    build(){
        this.content = create('div', this.wrapper, 'scroll-slide-container');
        // this.content.style.backgroundColor = this.element.color;
        this.videoNode = create('video', this.content, 'video-clip');
        this.videoNode.addEventListener('ended', this.videoEnded.bind(this));
        
        this.videoNode.setAttribute('playsinline', '');
        this.videoNode.setAttribute('controlslist', 'nodownload');

        this.videoNode.addEventListener('contextmenu', (e)=>{
            e.preventDefault();
        })
        // this.videoNode.setAttribute('muted', '');
        
        if(this.element.autoplay) this.videoNode.setAttribute('autoplay', '');
        this.videoSource = create('source', this.videoNode);
        
        // this.textContent = create('div', this.content, 'test-slide-content');
        // this.textContent.innerHTML = this.testSlideContent();
    }
    videoEnded(){
        console.log('video ended');
        this.root.nextSlide(this.id);
    }
    setSource(q){
        let p = process.env.EXTERNAL_ASSETS_PATH;
        this.videoSource.src = (q.matches) ? p + this.element['desktop-video'] : p + this.element['mobil-video'];
        this.videoNode.load();
        this.hasSource = true;
    }
    removeSource(){
        this.videoNode.pause();
        this.videoSource.removeAttribute('src');
        this.videoNode.load();
        this.hasSource = false;
    }
    switchSource(q){
        const p = this.videoNode.isplaying;
        // console.log('switch clip', this.id, p);
        this.setSource(q);
        if(p) this.videoNode.play();
    }

    show(){
        let promise = this.videoNode.play();
        let callback = this.showStartButton.bind(this);
        if (promise) {
            promise.catch(function(error) { 
                console.error('error', error);
                callback(); 
            });
        }
        // callback();
    }
    hide(){
        this.videoNode.pause();
    }
    showStartButton(){
        console.log('show start button local', this.element.id);
        this.root.showPlayButton(this.element.id);
    }
    testSlideContent(){
        return `VideoClip<br/>Slide ${this.element.id}`;
    }

}