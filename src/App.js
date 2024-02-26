// import logo from './logo.svg';
// import './App.css';
// import CalBricks from './components/CalBricks/CalBricks';
import * as React from "react";
// import { BrowserRouter } from "react-router-dom";
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import MaterialInBeam from "./components/MaterialInBeam";
import MaterialInColumn from "./components/MaterialInColumn";
import MaterialInSlab from './components/MaterialInSlab';
import MaterialInWall from "./components/MaterialInWall";
import Navbar from './components/Navbar/Navbar';
import SlidingImages from './components/SlidingImages';

// import { createRoot } from "react-dom/client";

function App() {
  return (
    <div className="bg-primary-subtle">
      <BrowserRouter  >
      <Navbar />
        
        <Routes>
         
          {/* <Route path="/"  element={ }/> */}
          <Route path="/"  element={<SlidingImages/> }/>
          <Route path="/slab" element={<MaterialInSlab/> }/>
          <Route path="/wall" element={<MaterialInWall/> }/>
          <Route path="/beam" element={<MaterialInBeam/> }/>
          <Route path="/column" element={<MaterialInColumn/> }/>
          <Route path="/ok" element={<Footer />}/>
          
        </Routes>
        {/* <MaterialInSlab/> */}

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
