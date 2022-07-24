import React from 'react';
import "./globalStyles.css"
import {Button, Container, Menu} from 'semantic-ui-react';
import { fromPairs } from 'lodash-es';
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


var numDivisions = 1;

function measureIndexOfArray(arrayLength, divisions, currentAmount) {
    return Math.floor(currentAmount/(arrayLength/divisions))}
const colorSchemes = [
    ["#06F935", "#F93506", "#3506F9"], 
    ["#52AD58", "#5852AD", "#AD5852"], 
    ["#FFD700", "#00FFD7", "#D700FF"],
    ["#00FFD7", "#D700FF", "#FFD700"],
    ["#23CADC", "#236EDC", "#23DC91"],
    ["#1982E6", "#191CE6", "#19E6E3"],
    ["#6036C9", "#b897c0", "#3655C9"],
    ["#50AF84", "#50AAAF", "#50AF55"],
    ["#50AF84", "#50AAAF", "#408d44"] 
]
class Home extends React.Component {
	constructor(props) {
		super(props);
        this.makeEpicycloid = this.makeEpicycloid.bind(this);
        this.epicycloidTouched = this.epicycloidTouched.bind(this);
        this.editEpicycloid = this.editEpicycloid.bind(this);
        this.animateEpicycloid = this.animateEpicycloid.bind(this);
        

       
        this.switchEpicycloid = this.switchEpicycloid.bind(this);
        this.cycloidPaths = [];
        this.svgWidth=800;
        this.svgHeight=700;
        // this.svgWidth=300;
        // this.svgHeight=300;
        this.currentEpicycloid = 1;

        this.cycloidSegments = [];
        this.pts = [];
        this.pastPt = {x:0,y:0}

        this.cycloidSegmentValues = [];

        this.canvasAnimationIter = 0;


        //  https://www.canva.com/colors/color-wheel/


        // these are good
        //  ["#06F935", "#F93506","#3506F9"]
        //  ["#52AD58", "#5852AD", "#AD5852"]
        //  ["#FFD700", "#00FFD7", "#D700FF"]
        //  ["#00FFD7", "#D700FF","#FFD700"]
        //  ["#23CADC", "#236EDC", "#23DC91"]
        //  ["#1982E6","#191CE6", "#19E6E3"]
        //  ["#6036C9", "#b897c0", "#3655C9"]
        //  ["#50AF84", "#50AAAF", "#50AF55"]
        //  ["#50AF84", "#50AAAF", "#408d44"]
        this.triadColors = ["#6036C9", "#b897c0", "#3655C9"]
	}

    componentDidMount() {
       
       
        // this.makeEpicycloid(1.55,3.1)
        // this.editEpicycloid(.775,1.55, 0, 1, 0, 0);

        // var pt0 = {x:400, y:400}
        // var pt1 = {x:175, y:175}
        // var pt2 = {x:200, y:175}
        

        // var r = 50;
        // var dist = 0.552284749831*r;
        
        // var d1 = `M${pt0.x+r}, ${pt0.y} 
        //     C${r+pt0.x},    ${dist+pt0.y}  ${dist+pt0.x}, ${r+pt0.y}  ${pt0.x},${pt0.y+r} 
        // `
        // var d2=`M${pt0.x},${pt0.y+r} 
        //     C${pt0.x-dist}, ${r+pt0.y} ${pt0.x-r}, ${dist+pt0.y}  ${pt0.x-r},${pt0.y}
        // `
        // var d3=`M${pt0.x-r},${pt0.y} 
        //     C${pt0.x-r},    ${pt0.y-dist}   ${pt0.x-dist}, ${pt0.y-r}  ${pt0.x},${pt0.y-r}
        // `
        // var d4=`M${pt0.x},${pt0.y-r} 
        //     C${dist+pt0.x},${pt0.y-r}      ${r+pt0.x}, ${pt0.y-dist}  ${pt0.x+r},${pt0.y}
        // `
        

        // pathObj = document.createElementNS("http://www.w3.org/2000/svg", "path");
        // pathObj.setAttribute('d',d2);
        // pathObj.setAttribute('stroke','green');
        // pathObj.setAttribute('fill','none');
        // document.getElementById("epicycloidGroup").appendChild(pathObj);
        // pathObj = document.createElementNS("http://www.w3.org/2000/svg", "path");
        // pathObj.setAttribute('d',d3);
        // pathObj.setAttribute('stroke','yellow');
        // pathObj.setAttribute('fill','none');
        // document.getElementById("epicycloidGroup").appendChild(pathObj);
        // pathObj = document.createElementNS("http://www.w3.org/2000/svg", "path");
        // pathObj.setAttribute('d',d4);
        // pathObj.setAttribute('stroke','blue');
        // pathObj.setAttribute('fill','none');
        // document.getElementById("epicycloidGroup").appendChild(pathObj);
        
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

    
    epicycloidTouched(e) {
       
        var pt = {x:e.clientX, y:e.clientY};
        console.log("touched ", e.target.id)
        var segmentIndex = parseInt(e.target.id.substr(4));
        var pathString =``

        this.cycloidSegmentValues[segmentIndex]
        
        var segmentArcData = this.cycloidSegmentValues[segmentIndex].arcData;
        var segmentMoveData = this.cycloidSegmentValues[segmentIndex].moveData;
        
        var numPhases = segmentArcData.length;
        for(let p=0; p < numPhases; ++p) {
            if(segmentArcData[p].length==1) {
                if(segmentMoveData[p].length!=1) {
                    pathString+=`M${segmentMoveData[p][0]}, ${segmentMoveData[p][1]} `  
                }
            }
            else if(segmentMoveData[p].length==1) {
                if(segmentArcData[p].length!=1) {
                    pathString+=`A${segmentArcData[p][2]} ${segmentArcData[p][3]/4} ${segmentArcData[p][5]} 1 1 ${segmentArcData[p][0]}, ${segmentArcData[p][1]} `
                    if(p+1 <numPhases) {
                        if(segmentMoveData[p+1].length!=1) pathString+=";"
                    }
                    
                }
            }
        }
        document.getElementById(`path${segmentIndex}`).insertAdjacentHTML('beforeend',`<animateTransform id="extraAnimation${segmentIndex}" attributeName="transform" attributeType="XML" type="skewX" values="1;1.2;1" repeatCount="6" dur="0.35s" additive="sum"/>`);
        //document.getElementById(`path${segmentIndex}`).insertAdjacentHTML('beforeend',`<animate id="extraAnimation${segmentIndex}"  begin="0s" additive="sum" attributeName="d" attributeType="XML" values="${pathString}" dur="${2}s" repeatCount="3" />`);
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
                 this.cycloidSegmentValues = []
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
                 this.cycloidSegmentValues = []
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
                 this.cycloidSegmentValues = []
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
                 this.cycloidSegmentValues = []
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
                 this.cycloidSegmentValues = []
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
                this.cycloidSegmentValues = []
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


    
    animateEpicycloid() {
        for(let a=0; a < this.cycloidSegmentValues.length; ++a) {
            var pathString = ""
            var durPerPhase = 4;
            // var spline = ".5 1 0.75 1;"
            var spline = "0 .91 1 .17;";
            
            var keySplines = ""
            var totalDur=6*durPerPhase;
            
            var segmentArcData = this.cycloidSegmentValues[a].arcData;
            var segmentMoveData = this.cycloidSegmentValues[a].moveData;
            
            var numPhases = segmentArcData.length;

            
            let numArcSegments = 4;
            let segmentAngle = 360/numArcSegments;
            var segmentRatio = (4/3)*Math.tan(Math.PI/(2*numArcSegments))
            var segmentLength = segmentRatio;
            var mainCanvas = document.getElementById("mainCanvas");
            var pastPt = {x:0,y:0};
            // var d1 = `M${pt0.x+r}, ${pt0.y} 
            //     C${r+pt0.x},    ${dist+pt0.y}  ${dist+pt0.x}, ${pt0.y+r}  ${pt0.x},${pt0.y+r} 
            // `
            // var d2=`M${pt0.x},${pt0.y+r} 
            //     C${pt0.x-dist}, ${pt0.y+r} ${pt0.x-r}, ${dist+pt0.y}  ${pt0.x-r},${pt0.y}
            // `
            // var d3=`M${pt0.x-r},${pt0.y} 
            //     C${pt0.x-r},    ${pt0.y-dist}   ${pt0.x-dist}, ${pt0.y-r}  ${pt0.x},${pt0.y-r}
            // `
            // var d4=`M${pt0.x},${pt0.y-r} 
            //     C${dist+pt0.x},${pt0.y-r}      ${r+pt0.x}, ${pt0.y-dist}  ${pt0.x+r},${pt0.y}
            // `


            

            for(let p=0; p < numPhases; ++p) {
                if(segmentArcData[p].length==1) {
                    if(segmentMoveData[p].length!=1) {
                        pastPt.x = segmentMoveData[p][0];
                        pastPt.y = segmentMoveData[p][1];
                        pathString+=`M${segmentMoveData[p][0]}, ${segmentMoveData[p][1]} `
                        
                        keySplines+=spline;
                    }
                }
                else if(segmentMoveData[p].length==1) {
                    if(segmentArcData[p].length!=1) {
                        
                        //A {rx ry angle large-arc-flag sweep-flag x y}
                        // pathString = `M${pastPt.x},${pastPt.y} `
                        pathString+=`A${segmentArcData[p][2]} ${segmentArcData[p][3]} ${segmentArcData[p][5]} 1 1 ${segmentArcData[p][0]}, ${segmentArcData[p][1]} `
                        

                        // mainCanvas.getContext('2d').beginPath();
                        // mainCanvas.getContext('2d').moveTo( pastPt.x,  pastPt.y)
                        // mainCanvas.getContext('2d').ellipse(segmentArcData[p][0], segmentArcData[p][1], segmentArcData[p][2], segmentArcData[p][3], 0, 0, segmentArcData[p][4]);
                        // mainCanvas.getContext('2d').stroke();
                        
                        pastPt.x = segmentArcData[p][0];
                        pastPt.y = segmentArcData[p][1];
                        // for making arc out of n bezier curves, length of curves is (4/3)*tan(pi/(2n)
                        //pathString +=  `t${segmentArcData[p][2]*segmentLength} `
                       
                        // var pathRadius = segmentArcData[p][2]
                        // for(let seg=0; seg < numArcSegments; seg+=segmentAngle) {
                        //     let x = pathRadius*Math.cos(57.2958*seg);
                        //     let y = pathRadius*Math.sin(57.2958*seg);

                        // }
                        
                        if(p+1 <numPhases) {
                            if(segmentMoveData[p+1].length!=1) pathString+=";"
                        }
                        keySplines+=spline;
                    }
                }
                
                
            }

            let flashDelay = getRandomInt(0,10);
            
            document.getElementById(`path${a}`).insertAdjacentHTML('beforeend',`<animate id="epicycloidAnimation${a}"  begin="0s" attributeName="d" keySplines="${keySplines}" attributeType="XML" values="${pathString}" dur="${totalDur}s" repeatCount="indefinite" />`);
            

        }
        //[imgCenter.x+x, imgCenter.y+y, xCoeff*(R+r)/r, yCoeff*(R+r)/r, 0, i, true]
        //A${(R+r)/r} ${(R+r)/r} ${i} ${1} ${1} ${imgCenter.x+x},${imgCenter.y+y}
        // for(let a=0; a <numDivisions;++a) {
        //     var pathString = ""
        //     var durPerPhase = 3;
        //     var spline = ".5 1 0.75 1;"
        //     var keySplines = ""
        //     var totalDur=this.cycloidSegments[a].length*durPerPhase;
        //     for(let i=0; i < this.cycloidSegments[a].length;++i) {
        //         pathString+=this.cycloidSegments[a][i]
        //         pathString+=";"
        //         keySplines+=spline;
        //     }
            
        //     document.getElementById(`path${a}`).insertAdjacentHTML('beforeend',`<animate id="epicycloidAnimation${a}"  begin="0s" attributeName="d" keySplines="${keySplines}" attributeType="XML" values="${pathString}" dur="${totalDur}s" repeatCount="indefinite" />`);
        // }
        
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
        var maxSegments = Math.floor(numCusps*360/degPerIter)
        let a0 = degPerIter*(1);
        let x0 = ((R+r)*Math.cos(radPerIter*(a0)) - (r)*Math.cos(radPerIter*(a0)*(R+r)/r));
        let y0 = ((R+r)*Math.sin(radPerIter*(a0)) - (r)*Math.sin(radPerIter*(a0)*(R+r)/r));
        // var d = `M${imgCenter.x+x0},${imgCenter.y+y0} `
        // var numSegments = 0;

        var currentPathObj = document.createElementNS("http://www.w3.org/2000/svg", "path");
        currentPathObj.setAttribute("id","path0");
        // currentPathObj.onmouseenter = (e) => this.epicycloidTouched(e);
        // currentPathObj.setAttribute("stroke",`hsl(${220}, ${getRandomInt(0,70)}%, ${getRandomInt(0,70)}%)`);
        
        currentPathObj.setAttribute("fill",this.triadColors[1]);
        this.cycloidSegments.push([`M${imgCenter.x+x0},${imgCenter.y+y0} `])
        this.cycloidSegmentValues.push({'moveData':[[imgCenter.x+x0, imgCenter.y+y0]], 'arcData':[[-1]]})

        var numSubPaths = Math.floor(maxSegments/numDivisions);
        var currentDivision = 0;
        for(let i =0; i<(numCusps)*360; i+=degPerIter) {
            if(i==0) continue;
            let pathOrder = Math.floor(i/degPerIter);
            var newDivision = measureIndexOfArray(maxSegments,numDivisions, pathOrder);
            if(newDivision != currentDivision) {
                currentDivision = newDivision;
                console.log("new div", newDivision, currentDivision);
                
                document.getElementById("epicycloidGroup").appendChild(currentPathObj);
                currentPathObj = document.createElementNS("http://www.w3.org/2000/svg", "path");
                currentPathObj.onmouseenter = (e) => this.epicycloidTouched(e);
                currentPathObj.setAttribute("id",`path${this.cycloidSegmentValues.length}`);
                // currentPathObj.setAttribute("stroke","black");
                currentPathObj.setAttribute("fill",this.triadColors[1]);

                let a = i;
                let x = ((R+r)*Math.cos(radPerIter*a) - (r)*Math.cos(radPerIter*(a)*(R+r)/r));
                let y = ((R+r)*Math.sin(radPerIter*a) - (r)*Math.sin(radPerIter*(a)*(R+r)/r));
               
                let a0 = degPerIter*(pathOrder-1);
                let x0 = ((R+r)*Math.cos(radPerIter*(a0)) - (r)*Math.cos(radPerIter*(a0)*(R+r)/r));
                let y0 = ((R+r)*Math.sin(radPerIter*(a0)) - (r)*Math.sin(radPerIter*(a0)*(R+r)/r));


                

                this.cycloidSegments.push([`M${imgCenter.x +x0},${imgCenter.y +y0} `]);
                this.cycloidSegments[this.cycloidSegments.length-1][0] +=`A${(R+r)/r} ${(R+r)/r} ${i} ${1} ${1} ${imgCenter.x+x},${imgCenter.y+y} `;
                
                // this.pts.push({x:imgCenter.x+x, y:imgCenter.y+y});

                this.cycloidSegmentValues.push({'moveData':[[imgCenter.x+x0, imgCenter.y+y0], [-1]], 'arcData':[[-1],[imgCenter.x+x, imgCenter.y+y, (R+r)/r, (R+r)/r, 0, i, true]]})
                

                //this.cycloidSegmentValues[this.cycloidSegmentValues.length-1].push({'data': [[imgCenter.x+x, imgCenter.y+y, (R+r)/r, (R+r)/r, 0, i, true]]})
                
            }
            else {
                currentDivision = newDivision;
                let a = i;
                let x = ((R+r)*Math.cos(radPerIter*a) - (r)*Math.cos(radPerIter*(a)*(R+r)/r));
                let y = ((R+r)*Math.sin(radPerIter*a) - (r)*Math.sin(radPerIter*(a)*(R+r)/r));
                let a0 = degPerIter*(pathOrder-1);
                let x0 = ((R+r)*Math.cos(radPerIter*(a0)) - (r)*Math.cos(radPerIter*(a0)*(R+r)/r));
                let y0 = ((R+r)*Math.sin(radPerIter*(a0)) - (r)*Math.sin(radPerIter*(a0)*(R+r)/r));

                
               
               
                this.cycloidSegments[this.cycloidSegments.length-1][0] += `A${(R+r)/r} ${(R+r)/r} ${i} ${1} ${1} ${imgCenter.x+x},${imgCenter.y+y} `
                this.cycloidSegmentValues[this.cycloidSegmentValues.length-1]['arcData'].push([imgCenter.x+x, imgCenter.y+y, (R+r)/r, (R+r)/r, 0, i, true]);
               
                this.cycloidSegmentValues[this.cycloidSegmentValues.length-1]['moveData'].push([-1])

                document.getElementById("epicycloidGroup").appendChild(currentPathObj);
                // currentPathObj = document.createElementNS("http://www.w3.org/2000/svg", "path");
                // currentPathObj.onmouseenter = (e) => this.epicycloidTouched(e);
                // currentPathObj.setAttribute("id",`path${this.cycloidSegmentValues.length}`);
                // currentPathObj.setAttribute("stroke","black");
                // currentPathObj.setAttribute("fill","none");

            }
        }
        
        // this.drawEpicycloid()
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
        this.cycloidSegmentValues[0].moveData.push([imgCenter.x+x0, imgCenter.y+y0])
        this.cycloidSegmentValues[0].arcData.push([-1])
        // currentPathObj.setAttribute("stroke",`hsl(${220}, ${getRandomInt(0,70)}%, ${getRandomInt(0,70)}%)`);
       
        this.cycloidSegments[0].push(`M${imgCenter.x+x0},${imgCenter.y+y0} `)
        var maxSegments = Math.floor(numCusps*360/degPerIter)

        var numSubPaths = Math.floor(maxSegments/numDivisions);
        var currentDivision =0;
        for(let i =0; i<(numCusps)*360 ; i+=degPerIter) {
            if(i==0) continue;
            let pathOrder = Math.floor(i/degPerIter);
            var newDivision = measureIndexOfArray(maxSegments,numDivisions, pathOrder);
            if(newDivision != currentDivision) {
                
                currentDivision = newDivision;
                // if(pathOrder%(numSubPaths)==0) {
                let a = i;
                let x = ((R+r)*Math.cos(radPerIter*a) - (r)*Math.cos(radPerIter*(a+skewShift)*(R+r)/r));
                let y = ((R+r)*Math.sin(radPerIter*a) - (r)*Math.sin(radPerIter*(a+skewShift)*(R+r)/r));

                let a0 = degPerIter*(pathOrder-1);
                let x0 = ((R+r)*Math.cos(radPerIter*(a0)) - (r)*Math.cos(radPerIter*(a0+skewShift)*(R+r)/r));
                let y0 = ((R+r)*Math.sin(radPerIter*(a0)) - (r)*Math.sin(radPerIter*(a0+skewShift)*(R+r)/r));

                // this.cycloidSegments.push([`M${imgCenter.x+x0},${imgCenter.y+y0} `]);
                // this.cycloidSegments[this.cycloidSegments.length-1][0] +=`A${(R+r)/r} ${(R+r)/r} ${i} ${1} ${1} ${imgCenter.x+x},${imgCenter.y+y} `;
                // this.cycloidSegments[currentDivision].push(`M${imgCenter.x +x0},${imgCenter.y+y0} `);
                // this.cycloidSegments[currentDivision][this.cycloidSegments[currentDivision].length-1] +=`A${xCoeff*(R+r)/r} ${yCoeff*(R+r)/r} ${i} ${1} ${1} ${imgCenter.x+x},${imgCenter.y+y} `;
                

                this.cycloidSegmentValues[currentDivision]['moveData'].push([imgCenter.x+x0, imgCenter.y+y0])
                this.cycloidSegmentValues[currentDivision]['arcData'].push([-1]);

                this.cycloidSegmentValues[currentDivision]['moveData'].push([-1]);
                this.cycloidSegmentValues[currentDivision]['arcData'].push([imgCenter.x+x, imgCenter.y+y, xCoeff*(R+r)/r, yCoeff*(R+r)/r, 0, i, true])
                
            }
            else {

                let a = i;
                let x = ((R+r)*Math.cos(radPerIter*a) - (r)*Math.cos(radPerIter*(a+skewShift)*(R+r)/r));
                let y = ((R+r)*Math.sin(radPerIter*a) - (r)*Math.sin(radPerIter*(a+skewShift)*(R+r)/r));
                // this.cycloidSegments[currentDivision][this.cycloidSegments[currentDivision].length-1] += `A${xCoeff*(R+r)/r} ${yCoeff*(R+r)/r} ${i} ${1} ${1} ${imgCenter.x+x},${imgCenter.y+y} `
                

                this.cycloidSegmentValues[currentDivision]['arcData'].push([imgCenter.x+x, imgCenter.y+y, xCoeff*(R+r)/r, yCoeff*(R+r)/r, 0, i, true])
                this.cycloidSegmentValues[currentDivision]['moveData'].push([-1])
            
            }
        }
        console.log("this.cycloidSegmentValues", this.cycloidSegmentValues)
        // for(let i =0; i<numCusps*360; i+=degPerIter) {
        //     if(i==0) continue;
        //     let a = i;
        //     let x = ((R+r)*Math.cos(radPerIter*a) - (r)*Math.cos(radPerIter*(a+skewShift)*(R+r)/r));
        //     let y = ((R+r)*Math.sin(radPerIter*a) - (r)*Math.sin(radPerIter*(a+skewShift)*(R+r)/r)); 
        //     d+=`A${xCoeff*(R+r)/r} ${yCoeff*(R+r)/r} ${i} ${0} ${1} ${imgCenter.x+x},${imgCenter.y+y} `
        // }
        // this.cycloidPaths.push(d);
        //  console.log("this.cycloidSegments", this.cycloidSegments)
    }

    render() {
     
        return(
            <Container id="homeContainer">
                <svg className="geoSVG" id="mainSVG" width={this.svgWidth} height={this.svgHeight}>
                    
                <defs>
                    <pattern id="Pattern" x="0" y="0" width=".100" height=".100" patternUnits='userSpaceOnUse' patternContentUnits='objectBoundingBox' >
                        <rect x="5" y="5" width="5" height="5" fill={this.triadColors[2]}/>
                        <rect x="0" y="0" width="2" height="2" fill={this.triadColors[1]}/>
                        <circle cx="10" cy="10" r="20" fill={this.triadColors[0]} fill-opacity="0.5"/>
                    </pattern>
                    {/* 52AD58,  5852AD, AD5852*/}
                    <radialGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        
                        <stop offset="0%"   stop-color={this.triadColors[0]}/>
                        <stop offset="100%" stop-color={this.triadColors[1]}/>
                    </radialGradient>
                    <radialGradient id="backgroundGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        
                        {/* <stop offset="20%"   stop-color="#0000c8"/>
                        <stop offset="100%" stop-color="#c8c800"/> */}
                        <stop offset="0%"   stop-color={this.triadColors[1]}/>
                        <stop offset="100%" stop-color={this.triadColors[2]}/>
                    </radialGradient>
                    <filter id="dispFilter" colorInterpolationFilters='sRGB'>
                        
                       {/*  <feGaussianBlur stdDeviation="5" fill='black' /> */}
                        <feOffset in="SourceGraphic" dx="6" dy="6" result="offset"/>
                      
                        <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="8" result="turbulence"/>
                        <feDisplacementMap result="disp" id="fedisplacementmap" in="SourceGraphic" in2="turbulence" xChannelSelector="G" yChannelSelector="B" scale="15"></feDisplacementMap>
                        
                        <feComposite in="disp" in2="SourceGraphic" operator="over" result="turb"/>
                       
                    </filter>
                </defs>
                    <rect x={0} y={0} width={this.svgWidth} height={this.svgHeight} fill="url(#backgroundGrad)"></rect>
                    
                    <g id="epicycloidGroup" ></g>
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