'use strict'
import './video-slides.scss';
import ScrollSlide from './scroll-slide';
import 'intersection-observer';

import {playButton, downArrow} from './svgs';

import {select, create, fetchFile, addPlayingPropertyToMedia} from '../utils/trix';

export default class VideoSlides{
    constructor(){
        this.container = select('[video-slides]');
        this.videoBufferCount = 2;
        this.init();
    }
    init(){
        this.load();
    }
    load(){
        fetchFile(process.env.DATA_ASSETS_PATH + process.env.DATA_FILE, (data)=>{
            this.data = JSON.parse(data);
            this.build();
        })
    }
    build(){
        addPlayingPropertyToMedia();
        // console.log('build', this.data, this.container);
        this.observer = new IntersectionObserver(this.onObserved.bind(this), {threshold:0})
        this.slides = [];
        this.allVideoSlides = [];
        this.soundVideos = [];
        // let scrollWrapper = create('div', this.container, 'scroll-wrapper');
        let wrapper = create('div', this.container, 'scroll-slide-wrapper');
        
        this.data.data.forEach((el, index) => {
            let scrollSlide = new ScrollSlide(index, wrapper, this, el);
            this.observer.observe(scrollSlide.scrollController);
            this.slides.push(scrollSlide);
        });
        
        this.query = window.matchMedia('(orientation:landscape)');
        // this.setSource(query);
        this.query.addListener(this.querySwitch.bind(this));
        
        this.allVideoSlides.forEach((el, index)=>{
            // console.log(index)
            if(index < this.videoBufferCount) el.displayContent.setSource(this.query);
        })
        this.container.appendChild(wrapper);
        this.showStartText('Tænd for lyden og scroll ned');

        
    }
    setActiveVideoRange(id){
        let start = this.allVideoSlides.indexOf(this.slides[id]);
        console.log('range: ', start);
        if(start > -1){
            let range = [];
            range.push(start)
            for(let i = 0; i < this.videoBufferCount ; i++){
                let a = start + i + 1;
                let z = start - i - 1;
                if(a < this.allVideoSlides.length) range.push(a);
                if(z > -1) range.unshift(z);
            }
            console.log(range);
            
            this.allVideoSlides.forEach((el, index)=>{
                if(range.indexOf(index) > -1){
                    // console.log('within range', index, el.id)
                    if(!el.displayContent.hasSource){
                        el.displayContent.setSource(this.query);
                    }
                }else{
                    // console.log('outside range', index, el.id)
                    if(el.displayContent.hasSource){
                        el.displayContent.removeSource();
                    }
                }
            })
        }
        
    }
    querySwitch(q){
        console.log('global switch', q.matches);
        this.allVideoSlides.forEach((el, index)=>{
            if(el.displayContent.hasSource){
                el.displayContent.switchSource(q);
            }
            //     el.displayContent.setSource(q);
        })
    }
    showStartText(text){
        const slide = this.slides[0];
        const t = (text === undefined) ? '' : `<div>${text}</div>`;
        console.log(slide);
        if(this.startText === undefined){
            this.startText = create('div', this.container, 'scroll-slide-start-text');
            this.startText.innerHTML = `${t}`;
            // this.nextButton.video = slide.displayContent.videoNode;
            slide.displayContent.content.appendChild(this.startText);
        }

    }

    showPlayButton(id){
        console.log('show play button root', id)
        const slide = this.slides[id];
        
        if(this.startButton === undefined){
            this.startButton = create('div', this.container, 'scroll-slide-start-button');
            this.startButton.innerHTML = `${playButton()}`;
            this.startButton.video = slide.displayContent.videoNode;
            this.startButton.addEventListener('click', (ev)=>{
                this.play();
                this.startButtonClicked = true;
                this.startButton.style.display = 'none';
            });
        }
        this.startButton.video = slide.displayContent.videoNode;
        
        if(!this.startButtonClicked){
            slide.displayContent.content.appendChild(this.startButton);
        }
    }
    start(id){
        const nextSlide = this.slides[id+1];
        // console.log('start ', nextSlide)
        this.soundVideos.forEach((el, index)=>{
            let promise = el.play();
            if (promise) {
                promise.catch(function(error) { 
                    // console.error('the error', error); 
                });
            }
            if(el === nextSlide.displayContent.videoNode){
                setTimeout(()=>{
                    el.play()
                }, 200);
            }
            if(el !== nextSlide.displayContent.videoNode){
                setTimeout(()=>{
                    // console.log('pause', el)
                    el.pause()
                }, 10)
            }
        })
    }
    play(){

        this.soundVideos.forEach((el, index)=>{
            let promise = el.play();
            if (promise) {
                promise.catch(function(error) { 
                    // console.error('the error', error); 
                });
            }
            if(el === this.startButton.video){
                setTimeout(()=>{
                    el.play()
                }, 200);
            }
            if(el !== this.startButton.video){
                setTimeout(()=>{
                    // console.log('pause', el)
                    el.pause()
                }, 10)
            }
        })
    }
    nextSlide(id){
        console.log('next slide', id);
        let nextSlide = this.slides[id+1];
        nextSlide.show();
        this.setActiveVideoRange(id+1)
        nextSlide.scrollController.scrollIntoView();
    }
    onObserved(entries){
        let entry = entries[0]
        console.log('observed:', entry.target.object.id);
        if(entry.isIntersecting){
            // console.log('intersecting');
            entry.target.object.show();
            this.setActiveVideoRange(entry.target.object.id)
            // console.log('show slide:', entry.target.object.id);
            this.slides.forEach( el => {
                if (el.id > entry.target.object.id && el.shown){
                    el.hide();
                }
                if (el.id < entry.target.object.id && el.shown){
                    el.hide();
                }
            })
        }
        if(!entry.isIntersecting && entry.boundingClientRect.top > 0){
            // console.log('not intersecting below')
            this.slides[entry.target.object.id -1].show();
            setTimeout(()=>{
                entry.target.object.hide();
            }, 100)
        }
    }
}