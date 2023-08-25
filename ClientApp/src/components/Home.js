import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from "axios"
import { Link, Route, Routes, Router } from 'react-router-dom';
import CategoryPage from './Category.js';

 function Home() {
     const [Category, setCategories] = useState([]);
     const [showRoutes, setShowRoutes] = useState(false)
     const [ClickedItem, setClickedItem] = useState({})

    useEffect(function () {
        var response = axios.get("https://localhost:7260/Categories")
        response.then(res => {
            setCategories(res.data)
        })
    }, [])
            console.log(Category)

     function RoutesF(item) {
             console.log("Made it",item.id)
         if (item.id === ClickedItem.id) {
         setShowRoutes(true)
         }
     }

    


    return (
        <div>
            <h1>Hello, class!</h1>
            <div style={{ width: "100%", height: "fit-content", display: "flex", flexDirection: "row" }}>

                <ul >
    
                   

                       
                               
                    {Category.map((item, index) => {
                        return (

                        <li key={index}>
                            <Link
                                to={`/category/${item.name}`}
                                onClick={() => {
                                    setClickedItem(item);
                                    RoutesF(item);
                                }}
                            >
                                {item.name}
                            </Link>


                        </li>
                        )
                    })}
                    {console.log(ClickedItem) }
                    {showRoutes && <Routes>
                        <Route path={"/category/" + ClickedItem.name} element={<CategoryPage ClickedItem={ClickedItem} />} />
                    </Routes> }
                               
                           
                        
                </ul>
            </div>
            
        </div>
    );

}
export default Home;