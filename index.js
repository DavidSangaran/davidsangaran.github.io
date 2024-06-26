var star = document.getElementById("svg-star")
var star8 = document.getElementById("svg-8star")
var starCount = 120;
var lineArr = document.getElementsByClassName("name-constellation-svg")
var starArr = cloneSVG(star,star8, starCount);

spreadSVG(starArr);
drawLine(lineArr);

const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {
            console.log(entry.target.id)
            document.querySelector("#person").classList.toggle("person-in", (entry.isIntersecting && entry.target.id == "second-div"))

        });    

    },{threshold: 0.7});

const elementList = document.querySelectorAll(".scrollElement") 
elementList.forEach((elem) => observer.observe(elem));


function cloneSVG(svgType1,svgType2, count){

    var svgArr = [];

    for( i=0 ; i<count ; i++ ){
        prob = Math.random();
        let currSvg;
        if (prob > 0.5){

            currSvg = svgType1.cloneNode(true);
            currSvg.removeAttribute('id');
            currSvg.style.visibility = "visible"; 
            svgArr.push(currSvg.cloneNode(true));
            
        }else{
            
            currSvg = svgType2.cloneNode(true);
            currSvg.removeAttribute('id');
            currSvg.style.visibility = "visible";
            svgArr.push(currSvg.cloneNode(true));
            
        }

    }
    
    return svgArr
};

function spreadSVG(svgArr){

    let colorArr=['#afc9ff','#c7d8ff','#fff4f3','#ffe5cf','#ffd9b2','#ffc78e','#ffa651']
    
    let screenWidth = window.innerWidth;
    let screenHeight = screen.availHeight;
    let bodyHeight = document.body.offsetHeight;

    let svgWidth = star.clientWidth;

    screenWidthPerc = (svgWidth/screenWidth) * 100 + 100;

    for( i=0 ; i<svgArr.length ; i++ ){

        let randX = Math.random()*screenWidthPerc;
        /* let randY = Math.random()*screenHeight; */ /* Previous PosY value */
        let randY = () => {
            const u1 = Math.random();
            const u2 = Math.random();
            const mean = 0;
            const stddev = 3.5;
            let z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2); /* This line is a standard deviation for the stars to appear less frequently the lower down the page*/
            z0 < 0 ? z0 *= -1: z0 *= 1; /* Normalizing negative numbers to positive */
            return Math.floor((z0/3*100)*stddev+mean);
        };
        let randwidth = Math.random()* (0.8 - 0.1) + 0.1;
        let randAngle = Math.random()*360;

        let randcolor = Math.floor(Math.random()*colorArr.length);
        let randBlur = Math.random() * 1;
        /* let randTime = 1; */
        let randTime = Math.random() * 1.5 + 1;
        
        svgArr[i].style.left = `${randX}%`
        svgArr[i].style.top = `${randY()}%`
        //svgArr[i].style.transform = `rotate(${randAngle}deg)`
        svgArr[i].style.transform = `scale(${randwidth})`
        //svgArr[i].style.height = `${randwidth}px`
        svgArr[i].style.fill = `${colorArr[randcolor]}`
        svgArr[i].style.filter = `blur(${randBlur}px)`
        svgArr[i].style.animation = `twinkle ${randTime}s ease-in-out infinite`
        document.getElementById("star-div").appendChild(svgArr[i]);

    }

}

function drawLine(arr){

    for( i=0 ; i<arr.length ; i++ ){

        let pathLength = arr[i].querySelector('svg path').getTotalLength();;

        arr[i].style.cssText=`stroke-dasharray: ${pathLength}; stroke-dashoffset: ${pathLength};`

    }

}

function scrollToNext(element) {

    let nextDiv = element.parentElement.nextSibling.nextSibling.nextSibling.nextSibling;
    console.log(nextDiv);
    nextDiv.scrollIntoView({ behavior: "smooth"});
   
}


function scrollTox(element, to, duration) {
    if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTox(element, to, duration - 10);
    }, 10);
}