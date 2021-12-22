import React from 'react';
import {Container} from 'semantic-ui-react';
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
class Home extends React.Component {

	constructor(props) {
		super(props);
        this.makeEpicycloid = this.makeEpicycloid.bind(this);
        this.editEpicycloid = this.editEpicycloid.bind(this);
        this.animateEpicycloid = this.animateEpicycloid.bind(this);
        this.cycloidPaths = [];
        this.svgWidth=800;
        this.svgHeight=800;
        
	}
    componentDidMount() {


        //***************************************** */
        this.makeEpicycloid(1,1.5);
        this.editEpicycloid(2,3, 45, 75, 1, 1);
        this.editEpicycloid(4,6, 45, 75, 1, 1);
        this.editEpicycloid(8,12, 45, 75, 1, 1);
        //***************************************** */
        // this.makeEpicycloid(1,5);
        // this.editEpicycloid(2,10, 45, 75, 1, 1);
        // this.editEpicycloid(4,20, 45, 75, 1, 1);
        // this.editEpicycloid(8,40, 45, 75, 1, 1);
        
        //***************************************** */
        // this.makeEpicycloid(.6,1.2);
        // this.editEpicycloid(1.2,2.4, 45, 75, 1, 1);

        //***************************************** */
        // this.makeEpicycloid(1,3);
        // this.editEpicycloid(2,6, 45, 75, 1, 1);
        // this.editEpicycloid(4,12, 45, 75, 1, 1);

        //***************************************** */
        // this.makeEpicycloid(2,4);
        // this.editEpicycloid(2,4, 135, 75, 1, 1);
        // this.editEpicycloid(2,4, 180, 75, .5, .5);
        // this.editEpicycloid(1,2, 30, 75, .5, .5);
        // this.editEpicycloid(.5,1, 45, 75, 1, 1);
        // this.editEpicycloid(.5,1, 90, 75, .5, .5);
        // this.editEpicycloid(.25,.5, 225, 75, 1, 1);
        // this.editEpicycloid(.25,.5, 270, 75, .5, .5);
        // this.editEpicycloid(.125,.25, 225, 75, 1, 1);
        // this.editEpicycloid(.125,.25, 270, 75, .5, .5);



        //***************************************** */
        // this.makeEpicycloid(3,6);
        // this.editEpicycloid(3,6, 135, 75, 1, 1);
        // this.editEpicycloid(3,6, 180, 75, .5, .5);
        // this.editEpicycloid(1.5,3, 30, 75, .5, .5);
        // this.editEpicycloid(1.5,3, 45, 75, 1, 1);
        // this.editEpicycloid(.75,1.5, 90, 75, .5, .5);
        // this.editEpicycloid(.375,.75, 45, 75, 1, 1);
        // this.editEpicycloid(.1875,.375, 90, 75, .5, .5);
        
        this.animateEpicycloid();
        
       
    }
    animateEpicycloid() {
        var pathString = ""
        var durPerPhase = 3;
        var totalDur=this.cycloidPaths.length*durPerPhase;
        for(let i=0; i < this.cycloidPaths.length;++i) {
            pathString+=this.cycloidPaths[i]
            pathString+=";"
        }
        document.getElementById("epicycloid").insertAdjacentHTML('beforeend',`<animate id="epicycloidAnimation" begin="0s" attributeName="d" attributeType="XML" values="${pathString}" dur="${totalDur}s" repeatCount="indefinite" />`);
    }
    makeEpicycloid(p,q) {
        var k = p/q;
        var r = 75;
        var R = k*r;
        var imgCenter = {x:this.svgWidth/2-(R+r)/r, y:this.svgHeight/2-(R+r)/r}
        var radPerIter = 57.2958;
        let numCusps = k;
        if(!Number.isInteger(k)) numCusps = p;
    
        var degPerIter = numCusps*((R+r)/r);
        let a0 = degPerIter*(1);
        let x0 = ((R+r)*Math.cos(radPerIter*(a0)) - (r)*Math.cos(radPerIter*(a0)*(R+r)/r));
        let y0 = ((R+r)*Math.sin(radPerIter*(a0)) - (r)*Math.sin(radPerIter*(a0)*(R+r)/r));
        var d = `M${imgCenter.x+x0},${imgCenter.y+y0} `

        var numSegments = 0;

        


        // var currentPathObj = document.createElementNS("http://www.w3.org/2000/svg", "path");
        // currentPathObj.setAttribute("id","path0");
        // currentPathObj.setAttribute("stroke",`hsl(${220}, ${getRandomInt(0,70)}%, ${getRandomInt(0,70)}%)`);
        // this.cycloidPaths.push([`M${imgCenter.x+x0},${imgCenter.y+y0} `])
        // var maxSegments = Math.floor(numCusps*360/degPerIter)
        
        // var numSubPaths = Math.floor(maxSegments/3);
        // console.log("maxSegments",maxSegments)
        // for(let i =0; i<numCusps*360; i+=degPerIter) {
        //     if(i==0) continue;
        //     let pathOrder = Math.floor(i/degPerIter);
            
        //     if(pathOrder%(maxSegments/numSubPaths)==0) {
        //         document.getElementById("epicycloidGroup").appendChild(currentPathObj);
                
        //         var currentPathObj = document.createElementNS("http://www.w3.org/2000/svg", "path");
        //         currentPathObj.setAttribute("id",`path${this.cycloidPaths.length}`);
        //         currentPathObj.setAttribute("stroke",`hsl(${220}, ${getRandomInt(0,70)}%, ${getRandomInt(0,70)}%)`);
        //         currentPathObj.setAttribute("d",this.cycloidPaths[this.cycloidPaths.length-1][0]);
        //         currentPathObj.setAttribute("fill","none");


        //         let a = i;
        //         let x = ((R+r)*Math.cos(radPerIter*a) - (r)*Math.cos(radPerIter*(a)*(R+r)/r));
        //         let y = ((R+r)*Math.sin(radPerIter*a) - (r)*Math.sin(radPerIter*(a)*(R+r)/r));
        //         this.cycloidPaths.push([`M${imgCenter.x+x},${imgCenter.y+y} `]);
        //         this.cycloidPaths[this.cycloidPaths.length-1][0] +=`A${(R+r)/r} ${(R+r)/r} ${i} ${1} ${1} ${imgCenter.x+x},${imgCenter.y+y} `;
                
                
        //     }
        //     else {
        //         let a = i;
        //         let x = ((R+r)*Math.cos(radPerIter*a) - (r)*Math.cos(radPerIter*(a)*(R+r)/r));
        //         let y = ((R+r)*Math.sin(radPerIter*a) - (r)*Math.sin(radPerIter*(a)*(R+r)/r));

        //         // d+=`A${(R+r)/r} ${(R+r)/r} ${i} ${0} ${1} ${imgCenter.x+x},${imgCenter.y+y} `
        //         this.cycloidPaths[this.cycloidPaths.length-1][0] += `A${(R+r)/r} ${(R+r)/r} ${i} ${1} ${1} ${imgCenter.x+x},${imgCenter.y+y} `
        //     }
            
        // }
        console.log("this.cycloidPaths",this.cycloidPaths)
        // try:for(let i =0; i<(maxSegments)*(360); i+=degPerIter) {
        for(let i =0; i<(numCusps)*(360); i+=degPerIter) {
            if(i==0) continue;
            var a = i;
            var x = ((R+r)*Math.cos(radPerIter*(a)) - (r)*Math.cos(radPerIter*(a)*(R+r)/r));
            var y = ((R+r)*Math.sin(radPerIter*(a)) - (r)*Math.sin(radPerIter*(a)*(R+r)/r));
            d+=`A${(R+r)/r} ${(R+r)/r} ${i} ${0} ${1} ${imgCenter.x+x},${imgCenter.y+y} `
            ++numSegments;
        }
      
        console.log('numSegments', numSegments);
        var epicycloid = document.getElementById("epicycloid");
        epicycloid.setAttribute("d",d);
        this.cycloidPaths.push(d);
    }

    editEpicycloid(p,q, skewShift=0, r=75, xCoeff=1, yCoeff=1) {
        var k = p/q;
        var R = k*r;
        var imgCenter = {x:this.svgWidth/2-(R+r)/r, y:this.svgHeight/2-(R+r)/r}
        var d = `M${imgCenter.x+R},${imgCenter.y} `
        var radPerIter = 57.2958;
        
        let numCusps = k;
        if(!Number.isInteger(k)) numCusps = p;
        var degPerIter = numCusps*((R+r)/r);

        let a0 = degPerIter*(1);
        let x0 = ((R+r)*Math.cos(radPerIter*(a0)) - (r)*Math.cos(radPerIter*(a0+skewShift)*(R+r)/r));
        let y0 = ((R+r)*Math.sin(radPerIter*(a0)) - (r)*Math.sin(radPerIter*(a0+skewShift)*(R+r)/r));
        var d = `M${imgCenter.x+x0},${imgCenter.y+y0} `

        for(let i =0; i<numCusps*360; i+=degPerIter) {
            if(i==0) continue;
            let a = i;
            let x = ((R+r)*Math.cos(radPerIter*a) - (r)*Math.cos(radPerIter*(a+skewShift)*(R+r)/r));
            let y = ((R+r)*Math.sin(radPerIter*a) - (r)*Math.sin(radPerIter*(a+skewShift)*(R+r)/r));
            d+=`A${xCoeff*(R+r)/r} ${yCoeff*(R+r)/r} ${i} ${0} ${1} ${imgCenter.x+x},${imgCenter.y+y} `
        }
        this.cycloidPaths.push(d);
    }

    
    render() {
        return(
                <Container id="homeContainer">
                    <svg class="geoSVG" id="mainSVG" width={this.svgWidth} height={this.svgHeight} style={{border:"1px solid black"}}>
                        <g id="epicycloidGroup">

                        </g>
                        <path id="epicycloid" stroke="black" fill="none">
                            
                        </path>
                    </svg>
                </Container>
        )
    }

    
}

export default Home;