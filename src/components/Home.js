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
        this.makeEpicycloid(4);
    }


    makeEpicycloid(k) {
        var r = 20;
        var R = k*r;

        

        var d = `M0,0 `
        for(let i =0; i<360; ++i) {
            
            let x = (R+r)*Math.cos(i) - (r)*Math.cos(i*(R+r)/r);
            let y = (R+r)*Math.sin(i) - (r)*Math.sin(i*(R+r)/r);
            d+=`L${x},${y} `
           

        }
        var epicycloid = document.getElementById("epicycloid");
        epicycloid.setAttribute("d",d);
    }


    render() {
        return(
            
                <Container id="homeContainer">
                    <svg class="geoSVG" id="mainSVG" width={1000} height={1000}>
                        <path id="epicycloid" stroke="black" />
                    </svg>
                </Container>

            
        )
    }

    
}

export default Home;