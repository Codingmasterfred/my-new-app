import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"
import Form from 'react-bootstrap/Form';
import  Button  from 'react-bootstrap/Button';


function SecondNavBar(props) {
    const [postCategoryRequestData, setpostCategoryRequestData] = useState("")
    const [postDescriptionRequestData, setpostDescriptionRequestData] = useState("")
    const [itemToDelete, setItemToDelete] = useState("")
    const [pickUpdatedCategory, setpickUpdatedCategory] = useState("")
    const [updateCategory, setUpdateCategory] = useState("")


    useEffect(function () {
        console.log("bfhkwbvwvh")
        var response = axios.get("https://localhost:7260/Categories")
        response.then(res => {
            props.setCategories(res.data)
        })
    }, []);


    function OnClickOnLinks(item) {
        props.setClickedItem(item)
        

    }

    function UpdateCategoryForPost(event) {
        setpostCategoryRequestData(event.target.value)

    }

    function UpdateDescriptionForPost(event) {
        setpostDescriptionRequestData(event.target.value)
    }

    function PostRequest() {
        try {

             axios.post("https://localhost:7260/Categories", {
                name: postCategoryRequestData,
                description: postDescriptionRequestData
            })
                .then(res => {
                    console.log("successful", res.data)

                    window.location.reload();
                })
                 .catch(error => {
                     console.error("failed" , error)
                 })
        }
        catch(error) {
            console.error(error)
        }
        
        
    }

    function DeleteItemUpdateFunction(event) {
        setItemToDelete(event.target.value)
    }

    function DeleteFunction() {
        props.Category.filter(item => {
            if (itemToDelete === item.name) {
                try {
                    axios.delete(`https://localhost:7260/Categories/${item.id}`)
                        .then(res => {
                            
                            window.location.reload()
                            
                        })
                        .catch(res => {
                            console.error("failed", res)
                        })
                } catch (error) {
                    console.error(error)
                }
            }
            else {
                console.log("keep trying ")
            }
        })
    }
    

    function ChooseUpdatedCategory(event) {
        setpickUpdatedCategory(event.target.value)
    }

    function ActuallyUpdatesItemFunction(event) {
        setUpdateCategory(event.target.value)
    }

    function UpdateFunction() {
        props.Category.filter(item => {
            if (pickUpdatedCategory === item.name) {
                try {
                    axios.put(`https://localhost:7260/Categories/${item.id}`, {name:updateCategory,description:"same"})
                        .then(res => {
                            console.log("We updated it ", res)
                            window.location.reload()
                            
                        })
                        .catch(res => {
                            console.error("failed", res)
                        })
                } catch (error) {
                    console.error(error)
                }
            }
            else {
                console.log("keep trying ")
            }
        })
    }

    return (
        <div style={{ width: "27%", height:"100vh"}}>
            <h1>Hello, class!</h1>
            <div style={{ width: "100%", maxHeight: "fit-content", display: "flex", flexDirection: "column", overflowY:"auto" }}>
                <ul>

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
            <div style={{display:"flex", flexDirection:"column", justifyContent:"space-evenly", border:"1px solid black", height:"200px"} }>
            <h3 style={{textAlign:"center"} }>Create A Category</h3>

                <Form.Control onChange={UpdateCategoryForPost} type="text" placeholder="Create A Category here..." style={{ textAlign: "center" }} />
                <Form.Control onChange={UpdateDescriptionForPost} type="text" placeholder="Create A Description here..." style={{ textAlign: "center" }} />
                <Button onClick={PostRequest} style={{ marginTop: "10px" }} >Submit</Button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", border: "1px solid black", height: "150px" }}>
                <h3 style={{textAlign:"center"} }>Delete A Category</h3>
                <Form.Control
                    onChange={DeleteItemUpdateFunction }
                    style={{textAlign:"center"} }
                    placeholder="Type A Category Name here..."
                    type="text"
                    id="inputText5"
                    aria-describedby="passwordHelpBlock"
                />
                <Button onClick={DeleteFunction } style={{width:"100%"} }>Delete</Button>
               

            </div>

           
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", border: "1px solid black", height: "200px" }}>
                    <h3 style={{ textAlign: "center" }}>Update A Category</h3>
                <Form.Control
                    onChange={ChooseUpdatedCategory}
                    style={{ textAlign: "center" }}
                    placeholder="Pick A Category here..."
                    type="text"
                    id="inputText5"
                    aria-describedby="passwordHelpBlock"
                />
                <Form.Control
                    onChange={ActuallyUpdatesItemFunction}
                    style={{ textAlign: "center" }}
                    placeholder="Update A Category here..."
                    type="text"
                    id="inputText5"
                    aria-describedby="passwordHelpBlock"
                />
                    <Button onClick={UpdateFunction} style={{ width: "100%" }}>Update</Button>
            </div>

        </div>
    );
    
}
export default SecondNavBar;