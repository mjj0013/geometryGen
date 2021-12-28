import React from 'react';
import "./globalStyles.css"
import {Button, Container, Menu} from 'semantic-ui-react';
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


var numDivisions = 1;

function measureIndexOfArray(arrayLength, divisions, currentAmount) {
    return Math.floor(currentAmount/(arrayLength/divisions))}

class Home extends React.Component {
	constructor(props) {
		super(props);
        this.makeEpicycloid = this.makeEpicycloid.bind(this);
        this.editEpicycloid = this.editEpicycloid.bind(this);
        this.animateEpicycloid = this.animateEpicycloid.bind(this);
        this.drawEpicycloid = this.drawEpicycloid.bind(this);
        this.switchEpicycloid = this.switchEpicycloid.bind(this);
        this.cycloidPaths = [];
        this.svgWidth=800;
        this.svgHeight=700;
        this.currentEpicycloid = 1;

        this.cycloidSegments = [];


        this.cycloidSegmentValues = [];
	}

    componentDidMount() {
        

        

        // this.makeEpicycloid(1.55,3.1)
        // this.editEpicycloid(.775,1.55, 0, 1, 0, 0);

        this.makeEpicycloid(3,6);
        this.editEpicycloid(3,6, 135, 1, 1, 1);
        this.editEpicycloid(3,6, 180, 2, .5, .5);
        this.editEpicycloid(1.5,3, 30, 4, .5, .5);
        this.editEpicycloid(1.5,3, 45, 2, 1, 1);
        this.editEpicycloid(.75,1.5, 90, 1, .5, .5);
        this.editEpicycloid(.375,.75, 45, 1, 1, 1);
        this.editEpicycloid(.1875,.375, 90, 1, .5, .5);
        this.animateEpicycloid();
    }

    switchEpicycloid(e) {
        switch(e.target.id) {
            case "sequenceButton1":
                if(this.currentEpicycloid==1) break;
                for(let i =0; i < numDivisions; ++i) {
                    document.getElementById(`epicycloidAnimation${i}`).remove();
                    document.getElementById(`path${i}`).remove();
                }
                // document.getElementById("epicycloidAnimation").remove();
                // document.getElementById("epicycloid").remove();
                 // this.cycloidPaths =[];
                 this.cycloidSegments = []
                // document.getElementById("mainSVG").insertAdjacentHTML('beforeend',`<path id="epicycloid" stroke="black" fill="none"></path>`)
                this.makeEpicycloid(3,6);
                this.editEpicycloid(3,6, 135, 1, .5, .5);
                this.editEpicycloid(3,6, 180, 1, .5, .5);
                this.editEpicycloid(1.5,3, 30, 1, 1, 1);
                this.editEpicycloid(1.5,3, 45, 1, 1, 1);
                this.editEpicycloid(.75,1.5, 90, 1, .5, .5);
                this.editEpicycloid(.75,1.5, 135, 1, 1, 1);
                this.editEpicycloid(.375,.75, 180, 1, .5, .5);
                this.editEpicycloid(.375,.75, 225, 1, 1, 1);
                this.editEpicycloid(.1875,.375, 270, 1, .5, .5);
                this.editEpicycloid(.1875,.375, 315, 1, 1, 1);
                this.animateEpicycloid();
                this.currentEpicycloid = 1;
                break;

            case "sequenceButton2":
                if(this.currentEpicycloid==2) break;
                for(let i =0; i < numDivisions; ++i) {
                    document.getElementById(`epicycloidAnimation${i}`).remove();
                    document.getElementById(`path${i}`).remove();
                }
                // document.getElementById("epicycloidAnimation").remove();
                // document.getElementById("epicycloid").remove();
                 // this.cycloidPaths =[];
                 this.cycloidSegments = []
                // document.getElementById("mainSVG").insertAdjacentHTML('beforeend',`<path id="epicycloid" stroke="black" fill="none"></path>`)
                this.makeEpicycloid(1,5);
                this.editEpicycloid(1,5, 45, 1, .5, .5);
                this.editEpicycloid(1,5, 90, 1, .5, .5);
                this.editEpicycloid(2,10, 135, 1, 1, 1);
                this.editEpicycloid(2,10, 180, 1, 1, 1);
                this.editEpicycloid(4,20, 225, 1, .5, .5);
                this.editEpicycloid(4,20, 270, 1, 1, 1);
                this.editEpicycloid(8,40, 315, 1, .5, .5);
                this.editEpicycloid(8,40, 360, 1, 1, 1);
                this.animateEpicycloid();
                this.currentEpicycloid = 2;
                break;

            case "sequenceButton3":
                if(this.currentEpicycloid==3) break;
                for(let i =0; i < numDivisions; ++i) {
                    document.getElementById(`epicycloidAnimation${i}`).remove();
                    document.getElementById(`path${i}`).remove();
                }
                // document.getElementById("epicycloidAnimation").remove();
                // document.getElementById("epicycloid").remove();
                 // this.cycloidPaths =[];
                 this.cycloidSegments = []
                // document.getElementById("mainSVG").insertAdjacentHTML('beforeend',`<path id="epicycloid" stroke="black" fill="none"></path>`)
                this.makeEpicycloid(.6,1.2);
                this.editEpicycloid(.6,1.2, 45, 1, .5, .5);
                this.editEpicycloid(.6,1.2, 90, 1, .5, .5);
                this.editEpicycloid(1.2,2.4, 135, 1, 1, 1);
                this.editEpicycloid(1.2,2.4, 180, 1, 1, 1);
                this.animateEpicycloid();
                this.currentEpicycloid = 3;
                break;

            case "sequenceButton4":
                if(this.currentEpicycloid==4) break;
                for(let i =0; i < numDivisions; ++i) {
                    document.getElementById(`epicycloidAnimation${i}`).remove();
                    document.getElementById(`path${i}`).remove();
                }
                // document.getElementById("epicycloidAnimation").remove();
                // document.getElementById("epicycloid").remove();
                 // this.cycloidPaths =[];
                 this.cycloidSegments = []
                // document.getElementById("mainSVG").insertAdjacentHTML('beforeend',`<path id="epicycloid" stroke="black" fill="none"></path>`)
                this.makeEpicycloid(1,3);
                this.editEpicycloid(1,3, 45, 1, .5, .5);
                this.editEpicycloid(1,3, 90, 1, .5, .5);
                this.editEpicycloid(2,6, 135, 1, 1, 1);
                this.editEpicycloid(2,6, 180, 1, 1, 1);
                this.editEpicycloid(4,12, 225, 1, .5, .5);
                this.editEpicycloid(4,12, 270, 1, .5, .5);
                this.animateEpicycloid();
                this.currentEpicycloid = 4;
                break;

            case "sequenceButton5":
                if(this.currentEpicycloid==5) break;
                for(let i =0; i < numDivisions; ++i) {
                    document.getElementById(`epicycloidAnimation${i}`).remove();
                    document.getElementById(`path${i}`).remove();
                }
                // document.getElementById("epicycloidAnimation").remove();
                // document.getElementById("epicycloid").remove();
                 // this.cycloidPaths =[];
                 this.cycloidSegments = []
                // document.getElementById("mainSVG").insertAdjacentHTML('beforeend',`<path id="epicycloid" stroke="black" fill="none"></path>`)
                this.makeEpicycloid(2,4);
                this.editEpicycloid(2,4, 135, 1, 1, 1);
                this.editEpicycloid(2,4, 180, 1, .5, .5);
                this.editEpicycloid(1,2, 30, 1, .5, .5);
                this.editEpicycloid(.5,1, 45, 1, 1, 1);
                this.editEpicycloid(.5,1, 90, 1, .5, .5);
                this.editEpicycloid(.25,.5, 225, 1, 1, 1);
                this.editEpicycloid(.25,.5, 270, 1, .5, .5);
                this.editEpicycloid(.125,.25, 225, 1, 1, 1);
                this.editEpicycloid(.125,.25, 270, 1, .5, .5);
                this.animateEpicycloid();
                this.currentEpicycloid = 5;
                break;

            case "sequenceButton6":
                if(this.currentEpicycloid==6) break;
                for(let i =0; i < numDivisions; ++i) {
                    document.getElementById(`epicycloidAnimation${i}`).remove();
                    document.getElementById(`path${i}`).remove();
                }
                // document.getElementById("epicycloidAnimation").remove();
                // document.getElementById("epicycloid").remove();
                // this.cycloidPaths =[];
                this.cycloidSegments = []
                // document.getElementById("mainSVG").insertAdjacentHTML('beforeend',`<path id="epicycloid" stroke="black" fill="none"></path>`)
                this.makeEpicycloid(1,1.5);
                this.editEpicycloid(2,3, 45, 1, 1, 1);
                this.editEpicycloid(4,6, 45, 1, 1, 1);
                this.editEpicycloid(8,12, 45, 1, 1, 1);
                this.animateEpicycloid();
                this.currentEpicycloid = 6;
                break;
        }
    }


    drawEpicycloid() {
        var mainCanvas = document.getElementById("mainCanvas");
        
    }
    animateEpicycloid(isCanvas=false) {
        if(isCanvas) {

            this.cycloidSegmentValues


        }
        for(let a=0; a <numDivisions;++a) {
            var pathString = ""
            var durPerPhase = 3;
            var spline = ".5 1 0.75 1;"
            var keySplines = ""
            var totalDur=this.cycloidSegments[a].length*durPerPhase;
            for(let i=0; i < this.cycloidSegments[a].length;++i) {
                pathString+=this.cycloidSegments[a][i]
                pathString+=";"
                keySplines+=spline;
            }
           
            document.getElementById(`path${a}`).insertAdjacentHTML('beforeend',`<animate id="epicycloidAnimation${a}"  begin="0s" attributeName="d" keySplines="${keySplines}" attributeType="XML" values="${pathString}" dur="${totalDur}s" repeatCount="indefinite" />`);
        }
        
        // var pathString = ""
        // var durPerPhase = 3;
        // var spline = ".5 1 0.75 1;"
        // var keySplines = ""
        // var totalDur=this.cycloidPaths.length*durPerPhase;
        // for(let i=0; i < this.cycloidPaths.length;++i) {
        //     pathString+=this.cycloidPaths[i]
        //     pathString+=";"
        //     keySplines+=spline;
        // }
        // document.getElementById("epicycloid").insertAdjacentHTML('beforeend',`<animate id="epicycloidAnimation"  begin="0s" attributeName="d" keySplines="${keySplines}" attributeType="XML" values="${pathString}" dur="${totalDur}s" repeatCount="indefinite" />`);
    }
    makeEpicycloid(p,q) {
        var k = p/q;
        var r = 100;
        var R = k*r;
        var imgCenter = {x:this.svgWidth/2-(R+r)/r, y:this.svgHeight/2-(R+r)/r}
        var radPerIter = 57.2958;
        let numCusps = k;
        if(!Number.isInteger(k)) numCusps = p;
    
        var degPerIter = numCusps*((R+r)/r);
        let a0 = degPerIter*(1);
        let x0 = ((R+r)*Math.cos(radPerIter*(a0)) - (r)*Math.cos(radPerIter*(a0)*(R+r)/r));
        let y0 = ((R+r)*Math.sin(radPerIter*(a0)) - (r)*Math.sin(radPerIter*(a0)*(R+r)/r));
        // var d = `M${imgCenter.x+x0},${imgCenter.y+y0} `
        // var numSegments = 0;

        var currentPathObj = document.createElementNS("http://www.w3.org/2000/svg", "path");
        currentPathObj.setAttribute("id","path0");
        // currentPathObj.setAttribute("stroke",`hsl(${220}, ${getRandomInt(0,70)}%, ${getRandomInt(0,70)}%)`);
        currentPathObj.setAttribute("stroke","black");
        currentPathObj.setAttribute("fill","none");
        this.cycloidSegments.push([`M${imgCenter.x+x0},${imgCenter.y+y0} `])
        this.cycloidSegmentValues.push([{'moveData':[[imgCenter.x+x0, imgCenter.y+y0]], 'arcData':[]}])

        // this.cycloidSegmentValues[0] = []
       
        var numSubPaths = Math.floor(maxSegments/numDivisions);
       
        console.log("maxSegments",maxSegments)
        for(let i =0; i<numCusps*360; i+=degPerIter) {
            if(i==0) continue;
            let pathOrder = Math.floor(i/degPerIter);
            
            if(pathOrder%(numSubPaths)==0 && pathOrder>=numSubPaths) {

                currentPathObj.setAttribute("d",this.cycloidSegments[this.cycloidSegments.length-1][0]);

                document.getElementById("epicycloidGroup").appendChild(currentPathObj);
                currentPathObj = document.createElementNS("http://www.w3.org/2000/svg", "path");


                currentPathObj.setAttribute("id",`path${this.cycloidSegments.length}`);
                
                // currentPathObj.setAttribute("stroke",`hsl(${220}, ${getRandomInt(0,70)}%, ${getRandomInt(0,70)}%)`);
                currentPathObj.setAttribute("stroke","black");
                // currentPathObj.setAttribute("d",this.cycloidSegments[this.cycloidSegments.length-1][0]);
                currentPathObj.setAttribute("fill","none");
                let a = i;
                let x = ((R+r)*Math.cos(radPerIter*a) - (r)*Math.cos(radPerIter*(a)*(R+r)/r));
                let y = ((R+r)*Math.sin(radPerIter*a) - (r)*Math.sin(radPerIter*(a)*(R+r)/r));
                let a0 = degPerIter*(pathOrder-1);
                let x0 = ((R+r)*Math.cos(radPerIter*(a0)) - (r)*Math.cos(radPerIter*(a0)*(R+r)/r));
                let y0 = ((R+r)*Math.sin(radPerIter*(a0)) - (r)*Math.sin(radPerIter*(a0)*(R+r)/r));
                this.cycloidSegments.push([`M${imgCenter.x +x0},${imgCenter.y +y0} `]);
                this.cycloidSegments[this.cycloidSegments.length-1][0] +=`A${(R+r)/r} ${(R+r)/r} ${i} ${1} ${1} ${imgCenter.x+x},${imgCenter.y+y} `;

                this.cycloidSegmentValues.push([{'moveData':[[imgCenter.x+x0, imgCenter.y+y0]], 'arcData':[[imgCenter.x+x, imgCenter.y+y, (R+r)/r, (R+r)/r, 0, i, true]]}])
                //this.cycloidSegmentValues[this.cycloidSegmentValues.length-1].push({'data': [[imgCenter.x+x, imgCenter.y+y, (R+r)/r, (R+r)/r, 0, i, true]]})
                
            }
            else {
                let a = i;
                let x = ((R+r)*Math.cos(radPerIter*a) - (r)*Math.cos(radPerIter*(a)*(R+r)/r));
                let y = ((R+r)*Math.sin(radPerIter*a) - (r)*Math.sin(radPerIter*(a)*(R+r)/r));

                
                this.cycloidSegments[this.cycloidSegments.length-1][0] += `A${(R+r)/r} ${(R+r)/r} ${i} ${1} ${1} ${imgCenter.x+x},${imgCenter.y+y} `
                // this.cycloidSegmentValues[this.cycloidSegmentValues.length-1].push({'data': [[imgCenter.x+x, imgCenter.y+y, (R+r)/r, (R+r)/r, 0, i, true]]})
                this.cycloidSegmentValues[this.cycloidSegmentValues.length-1].arcData.push([imgCenter.x+x, imgCenter.y+y, (R+r)/r, (R+r)/r, 0, i, true]);
                this.cycloidSegmentValues[this.cycloidSegmentValues.length-1].moveData.push([-1])
            }
        }

        this.drawEpicycloid()
        document.getElementById("epicycloidGroup").appendChild(currentPathObj);
       
        // for(let i =0; i<(numCusps)*(360); i+=degPerIter) {
        //     if(i==0) continue;
        //     var a = i;
        //     var x = ((R+r)*Math.cos(radPerIter*(a)) - (r)*Math.cos(radPerIter*(a)*(R+r)/r));
        //     var y = ((R+r)*Math.sin(radPerIter*(a)) - (r)*Math.sin(radPerIter*(a)*(R+r)/r));
        //     d+=`A${(R+r)/r} ${(R+r)/r} ${i} ${0} ${1} ${imgCenter.x+x},${imgCenter.y+y} `
        //     ++numSegments;
        // }
        // var epicycloid = document.getElementById("epicycloid");
        // epicycloid.setAttribute("d",d);
        // this.cycloidPaths.push(d);
    }

    editEpicycloid(p,q, skewShift=0, amp=1, xCoeff=1, yCoeff=1) {
        var k = p/q;
        var r = 75;
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
        
        var currentPathObj = document.getElementById("path0");
        this.cycloidSegmentValues[0].data.push([imgCenter.x+x0, imgCenter.y+y0])
        // currentPathObj.setAttribute("stroke",`hsl(${220}, ${getRandomInt(0,70)}%, ${getRandomInt(0,70)}%)`);
       
        this.cycloidSegments[0].push(`M${imgCenter.x+x0},${imgCenter.y+y0} `)
        var maxSegments = Math.floor(numCusps*360/degPerIter)

        var numSubPaths = Math.floor(maxSegments/numDivisions);

        for(let i =0; i<numCusps*360; i+=degPerIter) {
            if(i==0) continue;
            let pathOrder = Math.floor(i/degPerIter);
            let currentDivision = measureIndexOfArray(maxSegments,numDivisions, pathOrder);

            if(pathOrder%(numSubPaths)==0) {
                let a = i;
                let x = ((R+r)*Math.cos(radPerIter*a) - (r)*Math.cos(radPerIter*(a+skewShift)*(R+r)/r));
                let y = ((R+r)*Math.sin(radPerIter*a) - (r)*Math.sin(radPerIter*(a+skewShift)*(R+r)/r));

                let a0 = degPerIter*(pathOrder-1);
                let x0 = ((R+r)*Math.cos(radPerIter*(a0)) - (r)*Math.cos(radPerIter*(a0+skewShift)*(R+r)/r));
                let y0 = ((R+r)*Math.sin(radPerIter*(a0)) - (r)*Math.sin(radPerIter*(a0+skewShift)*(R+r)/r));
                // this.cycloidSegments.push([`M${imgCenter.x+x0},${imgCenter.y+y0} `]);
                // this.cycloidSegments[this.cycloidSegments.length-1][0] +=`A${(R+r)/r} ${(R+r)/r} ${i} ${1} ${1} ${imgCenter.x+x},${imgCenter.y+y} `;


                this.cycloidSegments[currentDivision].push(`M${imgCenter.x +x0},${imgCenter.y+y0} `);
                this.cycloidSegments[currentDivision][this.cycloidSegments[currentDivision].length-1] +=`A${xCoeff*(R+r)/r} ${yCoeff*(R+r)/r} ${i} ${1} ${1} ${imgCenter.x+x},${imgCenter.y+y} `;
                
                this.cycloidSegmentValues[currentDivision].moveData.push([imgCenter.x+x0, imgCenter.y+y0])
                this.cycloidSegmentValues[currentDivision].arcData.push([imgCenter.x+x, imgCenter.y+y, xCoeff*(R+r)/r, yCoeff*(R+r)/r, 0, i, true])
                
            }
            else {
                let a = i;
                let x = ((R+r)*Math.cos(radPerIter*a) - (r)*Math.cos(radPerIter*(a+skewShift)*(R+r)/r));
                let y = ((R+r)*Math.sin(radPerIter*a) - (r)*Math.sin(radPerIter*(a+skewShift)*(R+r)/r));
                // pastX = x;
                // pastY = y;
                this.cycloidSegments[currentDivision][this.cycloidSegments[currentDivision].length-1] += `A${xCoeff*(R+r)/r} ${yCoeff*(R+r)/r} ${i} ${1} ${1} ${imgCenter.x+x},${imgCenter.y+y} `
                

                this.cycloidSegmentValues[currentDivision].arcData.push([imgCenter.x+x, imgCenter.y+y, xCoeff*(R+r)/r, yCoeff*(R+r)/r, 0, i, true])
                this.cycloidSegmentValues[this.cycloidSegmentValues.length-1].moveData.push([-1])
            
            }
        }




        // for(let i =0; i<numCusps*360; i+=degPerIter) {
        //     if(i==0) continue;
        //     let a = i;
        //     let x = ((R+r)*Math.cos(radPerIter*a) - (r)*Math.cos(radPerIter*(a+skewShift)*(R+r)/r));
        //     let y = ((R+r)*Math.sin(radPerIter*a) - (r)*Math.sin(radPerIter*(a+skewShift)*(R+r)/r)); 
        //     d+=`A${xCoeff*(R+r)/r} ${yCoeff*(R+r)/r} ${i} ${0} ${1} ${imgCenter.x+x},${imgCenter.y+y} `
        // }
        // this.cycloidPaths.push(d);
         console.log("this.cycloidSegments", this.cycloidSegments)
    }

    render() {
        return(
            <Container id="homeContainer">
                <svg className="geoSVG" id="mainSVG" width={this.svgWidth} height={this.svgHeight}>
                     
                    <filter id="dispFilter" colorInterpolationFilters='sRGB'>
                        
                        <feDisplacementMap id="fedisplacementmap" in="SourceGraphic" xChannelSelector="R" yChannelSelector="B" scale="100"></feDisplacementMap>
                    </filter>
                    <g id="epicycloidGroup"></g>
                    <path id="epicycloid" fill="none" stroke="black" ></path>
                </svg>
                <canvas className="geoCanvas" id="mainCanvas"  width={this.svgWidth} height={this.svgHeight}></canvas>
                <Menu id="sequenceSelector" >
                    <Button id="sequenceButton1" className="item" onClick={(e)=>this.switchEpicycloid(e)}>Pattern 1</Button>
                    <Button id="sequenceButton2" className="item" onClick={(e)=>this.switchEpicycloid(e)}>Pattern 2</Button>
                    <Button id="sequenceButton3" className="item" onClick={(e)=>this.switchEpicycloid(e)}>Pattern 3</Button>
                    <Button id="sequenceButton4" className="item" onClick={(e)=>this.switchEpicycloid(e)}>Pattern 4</Button>
                    <Button id="sequenceButton5" className="item" onClick={(e)=>this.switchEpicycloid(e)}>Pattern 5</Button>
                    <Button id="sequenceButton6" className="item" onClick={(e)=>this.switchEpicycloid(e)}>Pattern 6</Button>
                </Menu>
               
            </Container>
        );
    }
}
export default Home;