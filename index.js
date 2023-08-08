var star = document.getElementById("svg-star")
var star8 = document.getElementById("svg-8star")
console.log(star8.querySelector("path"))
var starCount = 120;
var lineArr = document.getElementsByClassName("name-constellation-svg")
var starArr = cloneSVG(star,star8, starCount);

spreadSVG(starArr);
drawLine(lineArr);
//var line = document.getElementsByClassName("name-constellation-svg")[0];

/* window.addEventListener('scroll', function() {
    scrollToY(1000, 1000); // Example: Scroll to y=500 pixels over 1000 milliseconds
  }); */





function cloneSVG(svgType1,svgType2, count){

    var svgArr = [];

    for( i=0 ; i<count ; i++ ){
        prob = Math.random();
        let currSvg;
        if (prob > 0.5){

            currSvg = svgType1.cloneNode(true);
            currSvg.removeAttribute('id');
            currSvg.style.visibility = "visible"; 
            console.log(currSvg)
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

        let randX = Math.random()*screenWidth;
        let randY = Math.random()*screenHeight;
        let randwidth = Math.random()* (svgWidth*0.9 - svgWidth*0.1) + svgWidth*0.1;
        let randAngle = Math.random()*360;

        let randcolor = Math.floor(Math.random()*colorArr.length);
        let randBlur = Math.random() * 1;
        /* let randTime = 1; */
        let randTime = Math.random() * (3 - 1) + 1;
        
        svgArr[i].style.left = `${randX}px`
        svgArr[i].style.top = `${randY}px`
        //svgArr[i].style.transform = `rotate(${randAngle}deg)`
        svgArr[i].style.width = `${randwidth}px`
        svgArr[i].style.height = `${randwidth}px`
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

