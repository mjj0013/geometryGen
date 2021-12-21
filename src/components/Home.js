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
        // this.makeEpicycloid(21,10);
        // this.editEpicycloid(21,10, 0);
        // this.animateEpicycloid();

        this.makeEpicycloid(11,2);
       
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
        var k = p/q;
        var r = 15;
        var R = k*r;
        var imgCenter = {x:200-R, y:200-R}
        

        var d = `M${imgCenter.x+R},${imgCenter.y} `
        
        
        var outerCircleRotations = k;

        
        var radPerIter = 57.2958
        if(!Number.isInteger(k)) {
            outerCircleRotations = p+q;
        }

        // var degPerIter = Math.ceil(360/p);
        var degPerIter = 360/p;

        for(let i =0; i<outerCircleRotations*360; i+=degPerIter) {
            //subtract 5156.6(90deg to radians) as phase to make it skewed 
                if(i==0)continue;
                let x = ((R+r)*Math.cos(i*radPerIter) - (r)*Math.cos(radPerIter*i*(R+r)/r));
                let y = ((R+r)*Math.sin(i*radPerIter) - (r)*Math.sin(radPerIter*i*(R+r)/r));

                d+=`A${(R+r)/r} ${(R+r)/r} ${i} ${1} ${1} ${imgCenter.x+x},${imgCenter.y+y} `
            
            
          
            // d+=`L${imgCenter.x+x},${imgCenter.y+y} `

        }
        var epicycloid = document.getElementById("epicycloid");
        epicycloid.setAttribute("d",d);
        this.cycloidPaths.push(d);
    }

    editEpicycloid(p,q, skewShift=0) {
        var k = p/q;
        var r = 25;
        var R = k*r;
        var imgCenter = {x:200-R, y:200-R}
        

        var d = `M${imgCenter.x+R},${imgCenter.y} `
        
        
        var outerCircleRotations = k;

        
        var radPerIter = 57.2958
        if(!Number.isInteger(k)) {
            outerCircleRotations = p+q;
        }

        skewShift = skewShift*57.2958;


        // var degPerIter = Math.ceil(360/p);
        var degPerIter = 360/p;

        for(let i =0; i<outerCircleRotations*360; i+=degPerIter) {
            //subtract 5156.6(90deg to radians) as phase to make it skewed 
                if(i==0)continue;
                let x = ((R+r)*Math.cos(i*radPerIter + skewShift) - (r)*Math.cos(skewShift + radPerIter*i*(R+r)/r));
                let y = ((R+r)*Math.sin(i*radPerIter + skewShift) - (r)*Math.sin(skewShift + radPerIter*i*(R+r)/r));

                d+=`A${(R+r)/r} ${(R+r)/r} ${i} ${1} ${1} ${imgCenter.x+x},${imgCenter.y+y} `
           

        }
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