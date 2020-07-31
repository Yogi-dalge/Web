/* Page Preloading Here */

setTimeout(function(){
    $('.loader_bg').fadeToggle();
}, 3050);


/* Typing Text */

const typeTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");
const textArray = ["motivated", "inspired", "uplifted", "challenged", "free to call home"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typeTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    }
    else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);

    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typeTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex -1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    }
    else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >=textArray.length) textArrayIndex =0;
        setTimeout(type, typingDelay + 1100);

    }
}
document.addEventListener("DOMContentLoaded", function() {
   if(textArray.length) setTimeout(type, newTextDelay + 250);
});



/* Fixed Header/Navbar */

window.onscroll = function(){
    const docScrollTop = document.documentElement.scrollTop;

    if (window.innerWidth > 991){
        if (docScrollTop > 100){
            document.querySelector("header").classList.add("fixed")
        }
        else {
            document.querySelector("header").classList.remove("fixed")
        }
    }
}

/* Travels Section */

const filterButtons = document.querySelector("#filter-btns").children;
const items = document.querySelector(".travels-gallery").children;

for(let i = 0; i < filterButtons.length; i++){
    filterButtons[i].addEventListener("click", function(){
        for(let j = 0; j < filterButtons.length; j++){
            filterButtons[j].classList.remove("active")
        }

        this.classList.add("active");
        const target = this.getAttribute("data-target")

        for(let k = 0; k < items.length; k++){
            items[k].style.display = "none";
            if(target == items[k].getAttribute("data-id")){
                items[k].style.display = "block";
            }

            if(target == "highlights"){
                items[k].style.display = "block";
            }
        }
    })
}

/* Inspiration Section */

const sliderContainer=document.querySelector(".insp-slider");
const slides=sliderContainer.children;
const containerWidth=sliderContainer.offsetWidth;
const margin=30;
let itemPerSlide=0;
let slideDots;

const responsive=[
    {breakPoint:{width:0,item:1}},
    {breakPoint:{width:991,item:2}}
]

function load(){
    for(let i=0; i<responsive.length; i++){
        if(window.innerWidth>responsive[i].breakPoint.width){
            itemPerSlide=responsive[i].breakPoint.item;
        }
    }

    start();
}

function start(){
    totalWidth=0;
    for(let i=0; i<slides.length; i++){
        slides[i].style.width=(containerWidth/itemPerSlide)-margin + "px";
        slides[i].style.margin=margin/2 + "px";
        totalWidth+=containerWidth/itemPerSlide;
    }

    sliderContainer.style.width=totalWidth + "px";

     slideDots=Math.ceil(slides.length/itemPerSlide);

    for(let i=0; i<slideDots; i++){
        const div=document.createElement("div");
        div.id=i;
        div.setAttribute("onclick", "controlSlide(this)");
        if(i==0){
            div.classList.add("active");
        }
        document.querySelector(".slide-controls").appendChild(div);
    }

}
let currentSlide=0;


function controlSlide(element){
    currentSlide=element.id;
    changeSlide(currentSlide)
}

function changeSlide(currentSlide){
    controlButtons=document.querySelector(".slide-controls").children;
    console.log(currentSlide)

    for(let i=0; i<controlButtons.length; i++){
        if(controlButtons[i].id==currentSlide){
            controlButtons[i].classList.add("active")
        }
        else{
            controlButtons[i].classList.remove("active")
        }
        sliderContainer.style.marginLeft=-(containerWidth*currentSlide) + "px";
    }
}

window.onload=load();


/* Responsiveness */

const navbar = document.querySelector(".navbar");
    a = navbar.querySelectorAll("a");

    a.forEach(function(element) {
        element.addEventListener("click", function() {
            for (let i=0; i<a.length; i++) {
                a[i].classList.remove("active");
            }
            this.classList.add("active")
            document.querySelector(".navbar").classList.toggle("show");
        })
    })



const hamBurger = document.querySelector(".ham-burger");

hamBurger.addEventListener("click", function() {
    document.querySelector(".navbar").classList.toggle("show");
})




/* Read More button*/


let i = 0;
function read() {
    if(!i) {
        document.getElementById("more").style.display = "inline";
        document.getElementById("dots").style.display = "none";
        document.getElementById("read").innerHTML = "Read Less";
        i = 1;
    }
    else {
        document.getElementById("more").style.display = "none";
        document.getElementById("dots").style.display = "inline";
        document.getElementById("read").innerHTML = "Read More";
        i = 0;
    }
}


/* Submit Form in Progress */

const myForm = document.getElementById("myForm");

myForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you, Yogi will get back to you soon!")

    const request = new XMLHttpRequest();

    request.open("post", "submit.php");
    request.onload = function() {
        console.log(request.responseText);
    }

    request.send(new FormData(myForm));

});