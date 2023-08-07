var star = document.getElementById("svg-star")
var starCount = 120;
var lineArr = document.getElementsByClassName("name-constellation-svg")
var starArr = cloneSVG(star, starCount);

spreadSVG(starArr);
drawLine(lineArr);
//var line = document.getElementsByClassName("name-constellation-svg")[0];






function cloneSVG(svg, count){

    var svgArr = [];

    for( i=0 ; i<count ; i++ ){
        
        svgArr.push(svg.cloneNode(true));

    }
    
    return svgArr
};

function spreadSVG(svgArr){

    let colorArr=['#afc9ff','#c7d8ff','#fff4f3','#ffe5cf','#ffd9b2','#ffc78e','#ffa651',]
    
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    let svgWidth = star.clientWidth;

    screenWidth += svgWidth;
    screenHeight += svgWidth;

    for( i=0 ; i<svgArr.length ; i++ ){

        let randX = Math.random()*screenWidth;
        let randY = Math.random()*screenHeight;
        let randwidth = Math.random()*(svgWidth*0.70)+0.5;
        let randAngle = Math.random()*360;

        let randcolor = Math.floor(Math.random()*colorArr.length);
        let randBlur = Math.random();
        let randTime = (Math.random()*4)+0.5;

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

