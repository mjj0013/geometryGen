import React from 'react';
import "./globalStyles.css"
import {Button, Container, Menu} from 'semantic-ui-react';
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getMag(z) {
    var sum = 0;
    for(let i=0; i < z.length; ++i) {
        sum += (z[i]*z[i])
    }
    return Math.sqrt(sum);
}
class MandelBox extends React.Component {
    constructor(props) {
		super(props);
        // this.makeEpicycloid = this.makeEpicycloid.bind(this);
        // this.epicycloidTouched = this.epicycloidTouched.bind(this);
        // this.editEpicycloid = this.editEpicycloid.bind(this);
        // this.animateEpicycloid = this.animateEpicycloid.bind(this);
        this.iterateOverVector = this.iterateOverVector.bind(this);


        this.numVectors = props.numVectors? props.numVectors : 500;
        this.scale = props.scale? props.scale : 2;
        this.constant = props.constant? props.constant : 5;
        this.vectors = [];
        this.svgWidth=800;
        this.svgHeight=700;
        

        // this.cycloidSegments = [];
        this.pts = [];
        

        this.cycloidSegmentValues = [];

        this.canvasAnimationIter = 0;
	}
    iterateOverVector(z) {
        for(let i =0 ; i < z.length; ++i) {
            if(z[i]>1) {z[i] = 2 - z[i]; }
            else if(z[i] < -1) {z[i] = -2 - z[i]; }
        }
        var mag = getMag(z);
        
        if(mag < .5) { 
            for(let i=0; i < z.length; ++i) { z[i]*=4  }
        }
        else if(mag < 1) {
            
            for(let i=0; i < z.length; ++i) {
                z[i]/=(mag*mag)
            }
        }
        for(let i=0; i < z.length; ++i) {
            z[i] = this.scale*z[i] + this.constant
        }
    
        console.log('z',z)
        return z;

    }
    
    componentDidMount() {
        for(let v=0; v < this.numVectors; ++v) {
            var vec = [getRandomInt(200,800), getRandomInt(200,800), getRandomInt(200,800)];
            var iteratedVec = this.iterateOverVector(vec)
            // console.log('vec',vec)
            this.vectors.push(iteratedVec);
            
        }
        var mandelBoxSVG = document.getElementById("mandelBoxSVG")
        for(let v=0; v < this.vectors.length; ++v) {
            let initV = v>0? this.vectors[v-1] : [0,0,0];
            let x1 = this.vectors[v][0]
            let y1 = this.vectors[v][1]
            let x2 = this.vectors[v][0] - initV[0]
            let y2 = this.vectors[v][1] - initV[1]
            var line = document.createElementNS("http://www.w3.org/2000/svg","line" );
            line.setAttributeNS(null, "x1", x1)
            line.setAttributeNS(null, "x2", x2)
            line.setAttributeNS(null, "y1", y1)
            line.setAttributeNS(null, "y2", y2)
            line.setAttributeNS(null, "stroke", "black")
            mandelBoxSVG.appendChild(line);
        }
    }
    render() {
        return(
            <Container id="mandelBoxContainer">
                <svg className="geoSVG" id="mandelBoxSVG" width={this.svgWidth} height={this.svgHeight}>
                   
                </svg>


            </Container>
        )
    }
}

export default MandelBox;