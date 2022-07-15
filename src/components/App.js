import React from 'react';
import { Routes, BrowserRouter, Route} from "react-router-dom";

// import DynamicPage from './DynamicPage'; 
// import BasicForm from './PersonFormPage';
// import GraphicsPage from './GraphicsPage';
//import Loading from './Loading';

import Home from './Home';
import MandelBox from './MandelBox'
function App() {
	return(
		<BrowserRouter>
			<div>
				<Routes>
					<Route  path="/" element={<Home />} />
					<Route  path="/mandelBox" element={<MandelBox />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}
export default App;