'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click',function(e){
    const s1coords = section1.getBoundingClientRect();
    console.log(s1coords);

    console.log(e.target.getBoundingClientRect());

    console.log("height/width viewport",document.documentElement.clientHeight,document.documentElement.clientWidth);
 
    //window.scrollTo(s1coords.left + window.pageXOffset,s1coords.top + window.pageYOffset);

    // window.scrollTo({
    //     left:s1coords.left + window.pageXOffset,
    //     top:s1coords.top + window.pageYOffset,
    //     behavior:'smooth'
    // })

    section1.scrollIntoView({behavior:'smooth'});
}) 

// // Page navigation
// document.querySelectorAll('.nav__link').forEach(function(el){
//     el.addEventListener('click',function(e){
//         e.preventDefault();
//         const id = this.getAttribute('href')
//         document.querySelector(id).scrollIntoView({ behavior: 'smooth'})
//     })
// })
//1. Add event Listners to common parent el
//2. Determine what el originated the event.

document.querySelector('.nav__links').addEventListener('click',function(e){
          e.preventDefault();

          if (e.target.classList.contains('nav__link')){
        const id = e.target.getAttribute('href')
        document.querySelector(id).scrollIntoView({ behavior: 'smooth'})
     }
})

//Tabs component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click',function(e){
  //const clicked = e.target.parentElement;
  const clicked = e.target.closest('.operations__tab');

if(!clicked) return;

   
  //Remove Active Class
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  //Activate the active tab
  clicked.classList.add('operations__tab--active');
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add('operations__content--active');
})


//menu fade animation
const nav = document.querySelector('.nav');

const handleHover = function(e){
 if(e.target.classList.contains('nav__link')){
   const link = e.target;
   const siblings = link.closest('.nav').querySelectorAll('.nav__link');
   const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el =>{
    if(el !== link){
    el.style.opacity = this
    }
   })

    logo.style.opacity = this
 }
}

nav.addEventListener('mouseover',handleHover.bind(0.5))
  
nav.addEventListener('mouseout',handleHover.bind(1))

//Sticky navigation

// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll',function(e){
  
//   if(this.window.scrollY > initialCoords.top){
//     nav.classList.add('sticky')
//   }else{
//     nav.classList.remove('sticky')
//   }
// })

//Sticky navigation: intersection Observer API

const header = document.querySelector('.header');

const stickNav = function(entries){
  const [entry] = entries;

  entries.forEach(entry => console.log(entry))

  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(stickNav,{
  root:null,
  threshold:0
})

headerObserver.observe(header)

//Reveal Section Animaion

const allSections = document.querySelectorAll('.section');

const revealSection = function(entries,observer){
  entries.forEach(entry => console.log(entry))
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection,{
  root:null,
  threshold:0.15
})

allSections.forEach(function(section){
  section.classList.add('section--hidden');
  sectionObserver.observe(section)
})


//Lazy Loading Images

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries,observer){
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load',function(){
    entry.target.classList.remove('lazy-img')
  })
}

const imgObserver = new IntersectionObserver(loadImg,{
  root:null,
  threshold:0
})

imgTargets.forEach(img => imgObserver.observe(img))



//Slider

const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
let curSlide = 0;

const maxSlide = slides.length;

// slider.style.overflow = 'visible';
//  slider.style.transform = 'scale(0.5)'

slides.forEach((s,i)=>{
  console.log(s)
  s.style.transform = `translateX(${100 * (i)}%)`
})

function goToSlide (slide){
  slides.forEach((s,i)=>{
    console.log(i,curSlide)
    console.log(s)
    s.style.transform = `translateX(${100 * (i-slide)}%)`
  })
}



btnRight.addEventListener('click',function(){
  console.log(curSlide,maxSlide)
  if(curSlide === maxSlide - 1){
    curSlide = 0;
  }else{
    curSlide++;

  }

  goToSlide(curSlide)
})

btnLeft.addEventListener('click',function(){
  console.log(curSlide,maxSlide)
  if(curSlide ===0){
    curSlide = maxSlide - 1;
  
  }else{
    curSlide--;
}
goToSlide(curSlide)
 
})


// const obsCallBack = function(enytries,observer){
//   enytries.forEach(entry=>console.log(entry));
// }

// const obsOptions = {
//   root:null,
//   threshold:0.1
// }

// const observer = new IntersectionObserver(obsCallBack,obsOptions);

// observer.observe(section1);
  