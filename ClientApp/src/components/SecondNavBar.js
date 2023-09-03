import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"
import Form from 'react-bootstrap/Form';
import  Button  from 'react-bootstrap/Button';


function SecondNavBar(props) {

    useEffect(function () {
        console.log("bfhkwbvwvh")
        var response = axios.get("https://localhost:7260/Categories")
        response.then(res => {
            props.setCategories(res.data)
        })
    }, []);


    function OnClickOnLinks(item) {
        props.setClickedItem(item);
        

    }

    return (
        <div style={{ width: "27%",}}>
            <h1>Hello, class!</h1>
            <div style={{ width: "100%", maxHeight: "fit-content", display: "flex", flexDirection: "row", overflowY:"auto" }}>
                <ul>
                    {console.log(props.Category)}
                    {props.Category.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link
                                    to={`/category`}
                                    onClick={() => OnClickOnLinks(item)}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div style={{display:"flex", flexDirection:"column"} }>
            <h3 style={{textAlign:"center"} }>Create A Category</h3>

                <Form.Control type="text" placeholder="Create A Category here..." style={{textAlign:"center"} }  />
                <Button style={{ marginTop: "10px" }} >Submit</Button>
            </div>

        </div>
    );
    
}
export default SecondNavBar;