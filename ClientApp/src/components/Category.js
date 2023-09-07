import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Nav from "./NavMenu"
import SecondNavBar from "./SecondNavBar"
import Offcanvas from 'react-bootstrap/Offcanvas';

function CategoryPage(props) {
    const [show, setShow] = useState(false);
    const [localClickedItem, setLocalClickedItem] = useState(null);

    useEffect(function () {
        // Check if a clicked item exists in local storage
        const savedClickedObject = localStorage.getItem('clickedObject');
        if (savedClickedObject) {
            setLocalClickedItem(JSON.parse(savedClickedObject));
        }

        // Fetch the clicked item's data from the API if it's not in local storage
        if (!props.clickedItem.id && !localClickedItem) {
            return;
        }

        // Fetch data if props.clickedItem doesn't have data
        if (!props.clickedItem.id && localClickedItem) {
            props.setClickedItem(localClickedItem);
        } else if (props.clickedItem.id) {
            // Store the clicked item data in local storage
            localStorage.setItem('clickedObject', JSON.stringify(props.clickedItem));
        }
    }, [props.clickedItem, localClickedItem]);
    
    console.log(localClickedItem)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Nav />

            <div style={{ height: "100vh", width: "100%", display: "flex", justifyContent: "space-around" }}>
                <SecondNavBar
                    setClickedItem={props.setClickedItem} Category={props.Category} setCategories={props.setCategories} ClickedItem={props.ClickedItem} />
                <div id="ContainProducts" style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{display:"flex",justifyContent:"space-evenly", } }>
                        <h1 style={{}}>{props.clickedItem.name}</h1>
                        {props.clickedItem.name &&
                            <>
                            <Button variant="primary" onClick={handleShow} className="me-2">
                            Create A Product
                        </Button>
                        <Offcanvas show={show} onHide={handleClose} placement="end" {...props}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Create A Product</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                Some text as a placeholder. In real life, you can have the elements you
                                have chosen. Like text, images, lists, etc.
                            </Offcanvas.Body>
                    </Offcanvas>
                    
                </>}
                    
                   
                    </div>
                    <div style={{
                        display: "flex",
                        width: "800px"
                    }} >
                        {props.clickedItem.name && props.clickedItem.product || props.clickedItem.name && !props.clickedItem.product ?
                            props.clickedItem.products.map(product => (
                                <Card key={product.id} style={{ width: '14rem' }}>
                                    <Card.Img src="https://www.bing.com/th?id=OP.jEg7o%2fYqJQnaQw474C474&o=5&pid=21.1&w=130&h=176&qlt=100&dpr=1.5&bw=6&bc=FFFFFF&c=17" style={{ height: "230px" }} />
                                    <Card.Body>
                                        <Card.Title style={{ textAlign: "center" }}>{product.name}</Card.Title>
                                        <Card.Text style={{ textAlign: "center" }}>
                                            {product.description}
                                        </Card.Text>
                                        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                                            <Button variant="primary">Delete</Button>
                                            <Button variant="primary">Update</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))
                            :
                            (
                                props.Category.map(category => (
                                    category.products.length > 0 && (
                                        category.products.map(product => (
                                            <div key={product.id}>
                                                <Card style={{ width: '14rem' }}>
                                                    <Card.Img src="https://www.bing.com/th?id=OP.jEg7o%2fYqJQnaQw474C474&o=5&pid=21.1&w=130&h=176&qlt=100&dpr=1.5&bw=6&bc=FFFFFF&c=17" style={{ height: "230px", objectFit: "contain" }} />
                                                    <Card.Body>
                                                        <Card.Title style={{ textAlign: "center" }}>{product.name}</Card.Title>
                                                        <Card.Text style={{ textAlign: "center" }}>
                                                            {product.description}
                                                        </Card.Text>
                                                        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                                                            <Button variant="primary">Delete</Button>
                                                            <Button variant="primary">Update</Button>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </div>
                                        ))
                                    )
                                ))
                            )}
                    </div>
                </div>
                {/* Render your category data here */}
            </div>
        </>
    );
}

export default CategoryPage;
