import React from 'react';

import {Container} from 'semantic-ui-react';


class Home extends React.Component {

	constructor(props) {
		super(props);
		// this.bgCanvasRef = React.createRef();		//background canvas reference
        // this.bgContextRef = React.createRef();		//background context reference
        this.makeEpicycloid = this.makeEpicycloid.bind(this);
        this.editEpicycloid = this.editEpicycloid.bind(this);
        this.animateEpicycloid = this.animateEpicycloid.bind(this);
		this.state = { activeIndex: 0 }
        this.cycloidPaths = [];
        
	}
    componentDidMount() {
        // this.makeEpicycloid(21,3);
        // this.editEpicycloid(21,10, 0);
        // this.animateEpicycloid();
        this.makeEpicycloid(3,1);

        
        
        this.editEpicycloid(3,1, 0, 75,4, 4);
        this.editEpicycloid(3,1, 0, 75,3, 1);
        this.editEpicycloid(3,1, 0, 75,2, 4);
        this.editEpicycloid(3,1, 0, 75,1, 1);
        
        

        this.animateEpicycloid();
        // this.makeEpicycloid(11,2);
       
    }


    animateEpicycloid() {

        var pathString = ""
        for(let i=0; i < this.cycloidPaths.length;++i) {
            pathString+=this.cycloidPaths[i]
            pathString+=";"
        }
        // console.log(pathString);

        // <animateTransform id="epicycloidAnimation" attributeName="transform" attributeType="XML" type="rotate"
        //                   from="0 362.5 362.5" to="360 362.5 362.5" dur="4s" repeatCount="indefinite"
        // />
        document.getElementById("epicycloid").insertAdjacentHTML('beforeend',`<animate id="epicycloidAnimation" begin="0s" attributeName="d" attributeType="XML" values="${pathString}" dur="3s" repeatCount="indefinite" />`);
    }
    makeEpicycloid(p,q) {
        // this version works with: this.makeEpicycloid(3,1);
        var k = p/q;
        var r = 75;
        var R = k*r;
        var imgCenter = {x:700-R, y:650-R}
        var d = `M${imgCenter.x+R},${imgCenter.y} `
        var radPerIter = 57.2958;
        let numCusps = k;
        if(!Number.isInteger(k)) {
            numCusps = p;
        }
        var degPerIter = numCusps*((R+r)/r);
        

        
        console.log("degPerIter", degPerIter)
        
        let numSegments = 0;
        for(let i =0; i<(numCusps)*360; i+=degPerIter) {
            //subtract 5156.6(90deg to radians) as phase to make it skewed   
            let a = i;
            let x = ((R+r)*Math.cos(radPerIter*a) - (r)*Math.cos(radPerIter*a*(R+r)/r));
            let y = ((R+r)*Math.sin(radPerIter*a) - (r)*Math.sin(radPerIter*a*(R+r)/r));

            d+=`A${(R+r)/r} ${(R+r)/r} ${i} ${0} ${1} ${imgCenter.x+x},${imgCenter.y+y} `
            
            ++numSegments;
        }
        console.log("numSegments",numSegments)
        var epicycloid = document.getElementById("epicycloid");
        epicycloid.setAttribute("d",d);
        this.cycloidPaths.push(d);
    }

    // makeEpicycloid(p,q) {
    //     // this version works with: this.makeEpicycloid(3,1);
    //     var k = p/q;
    //     var r = 75;
    //     var R = k*r;
    //     var imgCenter = {x:700-R, y:650-R}
    //     var d = `M${imgCenter.x+R},${imgCenter.y} `
    //     var radPerIter = 57.2958;
    //     let numCusps = k;
    //     if(!Number.isInteger(k)) {
    //         numCusps = p;
    //     }
    //     var degPerIter = numCusps*((R+r)/r);
        
    //     console.log("degPerIter", degPerIter)
        
    //     let numSegments = 0;
    //     for(let i =0; i<numCusps*360; i+=degPerIter) {
    //         //subtract 5156.6(90deg to radians) as phase to make it skewed   
    //         let a = i;
    //         let x = ((R+r)*Math.cos(radPerIter*a) - (r)*Math.cos(radPerIter*a*(R+r)/r));
    //         let y = ((R+r)*Math.sin(radPerIter*a) - (r)*Math.sin(radPerIter*a*(R+r)/r));

    //         d+=`A${(R+r)/r} ${(R+r)/r} ${i} ${1} ${1} ${imgCenter.x+x},${imgCenter.y+y} `
            
    //         ++numSegments;
    //     }
    //     console.log("numSegments",numSegments)
    //     var epicycloid = document.getElementById("epicycloid");
    //     epicycloid.setAttribute("d",d);
    //     this.cycloidPaths.push(d);
    // }

    editEpicycloid(p,q, skewShift=0, r=75, xCoeff=1, yCoeff=1) {
        
        
        var k = p/q;
        // r = 75;
        var R = k*r;
        var imgCenter = {x:700-R, y:650-R}
        var d = `M${imgCenter.x+R},${imgCenter.y} `
        var radPerIter = 57.2958;
        let numCusps = k;
        if(!Number.isInteger(k)) {
            numCusps = p;
        }
        var degPerIter = numCusps*((R+r)/r);
        
        console.log("degPerIter", degPerIter)
        

        skewShift = skewShift*57.2958;

        let numSegments = 0;
        for(let i =0; i<numCusps*360; i+=degPerIter) {
            //subtract 5156.6(90deg to radians) as phase to make it skewed   
            let a = i;
            let x = ((R+r)*Math.cos(radPerIter*a) - (r)*Math.cos(radPerIter*a*(R+r)/r));
            let y = ((R+r)*Math.sin(radPerIter*a) - (r)*Math.sin(radPerIter*a*(R+r)/r));

            d+=`A${xCoeff*(R+r)/r} ${yCoeff*(R+r)/r} ${i+skewShift} ${0} ${1} ${imgCenter.x+x},${imgCenter.y+y} `
            
            ++numSegments;
        }
        console.log("numSegments",numSegments)

        this.cycloidPaths.push(d);
    }

    
    render() {
        return(
                <Container id="homeContainer">
                    <svg class="geoSVG" id="mainSVG" width={1000} height={1000}>
                        <path id="epicycloid" stroke="black" fill="none">
                            
                        </path>

                        {/* <path stroke="black" fill="none" d="M250,250 A25 25 60 0 1 300,300">
                            
                        </path> */}
                    </svg>
                </Container>
        )
    }

    
}

export default Home;