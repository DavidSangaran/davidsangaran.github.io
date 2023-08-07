var star = document.getElementById("svg-star")
var starCount = 300;

var starArr = cloneSVG(star, starCount);

spreadSVG(starArr);








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
        let randwidth = Math.random()*(svgWidth*0.75);
        let randAngle = Math.random()*360;
        let randcolor = Math.floor(Math.random()*colorArr.length);

        svgArr[i].style.left = `${randX}px`
        svgArr[i].style.top = `${randY}px`
        svgArr[i].style.transform = `rotate(${randAngle}deg)`
        svgArr[i].style.width = `${randwidth}px`
        svgArr[i].style.height = `${randwidth}px`
        svgArr[i].style.fill = `${colorArr[randcolor]}`
        document.getElementById("star-div").appendChild(svgArr[i]);

    }

}

