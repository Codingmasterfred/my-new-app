import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import CategoryPage from './components/Category';
import Home from './components/Home';
import Nav from "./components/NavMenu"
import './custom.css';
import SecondNavBar from "./components/SecondNavBar"


function App() {
    const [Category, setCategories] = useState([]);
    const [ClickedItem, setClickedItem] = useState({});
    const [RoutesArray,addRoutesArray ] = useState([])

    return (
        <>
           
            <Routes>
                {/* Define the root route */}
                <Route
                    path="/"
                    element={<Home setClickedItem={setClickedItem} Category={Category} setCategories={setCategories} ClickedItem={ClickedItem} /> }
                    
                />

                {/* Define category routes */}
               
                    <Route
                       
                        path={`/category`}
                        element={<CategoryPage clickedItem={ClickedItem}  RoutesArray={RoutesArray} addRoutesArray={addRoutesArray} Category={Category} setCategories={setCategories} setClickedItem={setClickedItem } />}
                    />
               
            </Routes>
        </>
    );
}

export default App;
