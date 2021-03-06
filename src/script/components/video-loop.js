'use strict'

import {create} from '../utils/trix';
import {downArrow} from './svgs';
import './video.scss';

export default class VideoLoop{
    constructor(id, content, element, root){
        this.id = id;
        this.content = content;
        this.element = element;
        this.hasVideo = true;
        this.firstPlay = true;
        this.root = root;
        this.init();
    }
    init(){
        this.build();
    }
    build(){
        this.videoNode = create('video', this.content, 'video-loop');
        
        this.videoNode.setAttribute('playsinline', '');
        this.videoNode.setAttribute('loop', '');
        this.videoNode.setAttribute('muted', 'muted');
        this.videoNode.setAttribute('autoplay', '');
        this.videoNode.setAttribute('controlslist', 'nodownload');
        
        // this.videoNode.addEventListener('contextmenu', (e)=>{
        //     e.preventDefault();
        // })
        
        this.videoSource = create('source', this.videoNode);
        
        this.addNextButton();
    }
    addNextButton(){
        // console.log('add next button', this.id);
        this.buttonContainer = create('div', this.content, 'next-button-container');
        this.nextButton = create('div', this.buttonContainer, 'scroll-slide-next-button');
        if(this.id === 0) {
            this.nextButton.classList.add('start-next');
        }
        this.nextButton.innerHTML = `${downArrow()}`;
        // this.nextButton.video = slide.displayContent.videoNode;
        this.buttonContainer.addEventListener('click', (ev)=>{
            // console.log('next');
            this.root.nextSlide(this.id);
            if(!this.root.startButtonClicked){
                this.root.start(this.id);
                this.root.startButtonClicked = true;
                if(this.root.startButton !== undefined) this.root.startButton.style.display = 'none';
            }
        });
    }
    setSource(q){
        let p = process.env.EXTERNAL_ASSETS_PATH + 'videos/';
        this.videoSource.src = (q.matches) ? p + this.element['desktop-video'] : p + this.element['mobil-video'];
        this.videoNode.load();
        this.hasSource = true;
    }
    removeSource(){
        this.videoNode.pause();
        this.videoSource.removeAttribute('src');
        this.videoNode.load();
        this.hasSource = false;
        this.firstPlay = true;
    }
    switchSource(q){
        const p = this.videoNode.isplaying;
        // console.log('switch loop', this.id, p);
        this.setSource(q);
        if(p) this.videoNode.play();
    }
    
    show(){
        if(this.firstPlay){
            this.videoNode.addEventListener('loadedmetadata', (ev)=>{
                console.log('loaded metadata');
                this.videoNode.muted = true;
                this.play();
            })
            this.firstPlay = false;
        }else{
            this.play()
        }
        setTimeout(()=>{
            if(this.nextButton !== undefined) this.nextButton.style.opacity = 1;
        }, 500);
        // console.log('show loop');
    }
    play(){
        let promise = this.videoNode.play();
        if (promise) {
            promise.catch(function(error) { 
                console.error('loop error', error); 
            });
        }
    }
    hide(){
        this.videoNode.pause();
    }
    testSlideContent(){
        return `VideoLoop<br/>Slide ${this.element.id}`;
    }
}