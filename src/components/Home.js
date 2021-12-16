import React from 'react';

import {Container} from 'semantic-ui-react';


class Home extends React.Component {

	constructor(props) {
		super(props);
		// this.bgCanvasRef = React.createRef();		//background canvas reference
        // this.bgContextRef = React.createRef();		//background context reference
        this.makeEpicycloid = this.makeEpicycloid.bind(this);

		this.state = { activeIndex: 0 }
        
	}
    componentDidMount() {
        //this.makeEpicycloid(2.1);
        this.makeEpicycloid(5.5);
         
        // this.makeEpicycloid(1);
    }


    makeEpicycloid(k) {
        var r = 25;
        var R = k*r;
        var imgCenter = {x:500-R, y:500-R}
        

        var d = `M${imgCenter.x+R},${imgCenter.y} `

        for(let i =0; i<360; i+=1) {
            
            let x = (R+r)*Math.cos(i*57.2958) + (r)*Math.cos(57.2958*i*(R+r)/r);
            let y = (R+r)*Math.sin(i*57.2958) + (r)*Math.sin(57.2958*i*(R+r)/r);
            // let x = r*(k+1)*Math.cos(i*57.2958) - (r)*Math.cos(57.2958*i*(k+1));
            // let y = r*(k+1)*Math.sin(i*57.2958) - (r)*Math.sin(57.2958*i*(k+1));
            d+=`L${imgCenter.x+x},${imgCenter.y+y} `
           

        }
        var epicycloid = document.getElementById("epicycloid");
        epicycloid.setAttribute("d",d);
    }


    render() {
        return(
            
                <Container id="homeContainer">
                    <svg class="geoSVG" id="mainSVG" width={1000} height={1000}>
                        <path id="epicycloid" stroke="black" fill="none"/>
                    </svg>
                </Container>

            
        )
    }

    
}

export default Home;