var star = document.getElementById("svg-star")
var star8 = document.getElementById("svg-8star")
var starCount = 120;
var lineArr = document.getElementsByClassName("name-constellation-svg")
var starArr = cloneSVG(star,star8, starCount);

spreadSVG(starArr);
drawLine(lineArr);
//var line = document.getElementsByClassName("name-constellation-svg")[0];

/* window.addEventListener('scroll', function() {
    scrollToY(1000, 1000); // Example: Scroll to y=500 pixels over 1000 milliseconds
  }); */

const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {
            console.log(entry.target.id)
            document.querySelector("#person").classList.toggle("person-in", (entry.isIntersecting && entry.target.id == "second-div"))

        });    

    },{threshold: 0.6});

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
    let screenHeight = window.innerHeight;

    let svgWidth = star.clientWidth;

    screenWidth += svgWidth;
    screenHeight += svgWidth;

    for( i=0 ; i<svgArr.length ; i++ ){

        let randX = Math.random()*100;
        /* let randY = Math.random()*screenHeight; */ /* Previous PosY value */
        let randY = () => {
            const u1 = Math.random();
            const u2 = Math.random();
            let z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2); /* This line is a standard deviation for the stars to appear elss frequently the lower down the page*/
            z0 < 0 ? z0 *= -1: z0 *= 1; /* Normalizing negative numbers to positive */
            return Math.floor(z0*100);
        };
        let randwidth = Math.random() * (svgWidth/screenWidth * 100);
        let randAngle = Math.random()*360;

        let randcolor = Math.floor(Math.random()*colorArr.length);
        let randBlur = Math.random() * 1;
        /* let randTime = 1; */
        let randTime = Math.random() * (3 - 1) + 1;
        
        svgArr[i].style.left = `${randX}%`
        svgArr[i].style.top = `${randY()}%`
        //svgArr[i].style.transform = `rotate(${randAngle}deg)`
        svgArr[i].style.width = `${randwidth}%`
        svgArr[i].style.height = `${randwidth}%`
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

function scrollToY(targetY, duration) {
    const startY = window.scrollY;
    const startTime = performance.now();
  
    function scrollStep(timestamp) {
      const currentTime = timestamp - startTime;
      const progress = Math.min(currentTime / duration, 1);
  
      window.scrollTo(0, startY + (targetY - startY) * progress);
  
      if (progress < 1) {
        window.requestAnimationFrame(scrollStep);
      }
    }
  
    window.requestAnimationFrame(scrollStep);
  }

