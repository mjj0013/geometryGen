import React from 'react';
import { Routes, BrowserRouter, Route} from "react-router-dom";

// import DynamicPage from './DynamicPage'; 
// import BasicForm from './PersonFormPage';
// import GraphicsPage from './GraphicsPage';
//import Loading from './Loading';

import Home from './Home';



function App() {
	return(
		<BrowserRouter>
			<div>
				<Routes>
					<Route  path="/" element={<Home />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

//export default hot(App);
export default App;