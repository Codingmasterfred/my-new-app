import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Nav from "./NavMenu"
import SecondNavBar from "./SecondNavBar"
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
    
    import Modal from 'react-bootstrap/Modal';

function CategoryPage(props) {
    const [show, setShow] = useState(false);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState("")
    const [updatedProductName, setUpdatedProductName] = useState('');
    const [updatedProductDescription, setUpdatedProductDescription] = useState('');
    const [updatedProductPrice, setUpdatedProductPrice] = useState('');
    const [shows, setShows] = useState(false);
    const [productId,setProductId] = useState("")




    const loadClickedItemData = () => {
        // Check if a clicked item exists in local storage
        const savedClickedObject = localStorage.getItem('clickedObject');
        if (savedClickedObject) {
            const clickedItem = JSON.parse(savedClickedObject);
            props.setClickedItem(clickedItem);
        } else if (props.clickedItem.id) {
            // If clickedItem has data, store it in local storage
            localStorage.setItem('clickedObject', JSON.stringify(props.clickedItem));
        }
    };

    useEffect(() => {
        if (!props.clickedItem.id) {
            loadClickedItemData();
        }
    }, [props.clickedItem]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloses = () => setShows(false);
    const handleShows = () => setShows(true);

    useEffect(() => {
        // Save the latest clicked item to local storage
        if (props.clickedItem.id) {
            localStorage.setItem('clickedObject', JSON.stringify(props.clickedItem));

            // Delete old stored clicked items (if any)
            Object.keys(localStorage).forEach((key) => {
                if (key !== 'clickedObject') {
                    localStorage.removeItem(key);
                }
            });
        }
    }, [props.clickedItem]);

    function handleCreateProduct() {
        axios.post("https://localhost:7260/Products", {
            name: productName,
            description: productDescription,
            price: productPrice,
            categoryId: props.clickedItem.id
        })
            .then(res => {
                console.log("We updated it ", res)
                window.location.reload()

            })
            .catch(res => {
                console.error("failed", res)
            })

    }

    function handleDeleteRequest(id) {
        axios.delete("https://localhost:7260/Products/" + id)
            .then(res => {
                console.log("We updated it ", res)
                window.location.reload()

            })
            .catch(res => {
                console.error("failed", res)
            })

    }

    function handleUpdateProductId(id) {
        handleShows(true)
        setProductId(id)
    }

    function handleUpdateProduct() {
        axios.put(`https://localhost:7260/Products/${productId}`, {
            name: updatedProductName,
            description: updatedProductDescription,
            price: updatedProductPrice,
            categoryId: props.clickedItem.id
        })
            .then(res => {
                console.log("Product updated successfully", res);
        handleCloses(true)
                window.location.reload();
            })
            .catch(error => {
                console.error("Failed to update product", error);
            });

    }



    return (
        <>
            <Nav />

            <div style={{ height: "100vh", width: "100%", display: "flex", justifyContent: "space-around" }}>
                <SecondNavBar
                    setClickedItem={props.setClickedItem} Category={props.Category} setCategories={props.setCategories} ClickedItem={props.ClickedItem} />
                <div id="ContainProducts" style={{ display: "flex", flexDirection: "column", }}>
                    <Modal show={shows} onHide={handleCloses}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body> <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter product name"

                                    onChange={(e) => setUpdatedProductName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Product Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter product description"

                                    onChange={(e) => setUpdatedProductDescription(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Product Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter product price"

                                    onChange={(e) => setUpdatedProductPrice(e.target.value)}
                                />
                            </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloses}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleUpdateProduct }>
                                Update
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <h1 style={{}}>{props.clickedItem.name}</h1>
                        {props.clickedItem.name && (
                            <Button variant="primary" onClick={handleShow} className="me-2">
                                Create A Product
                            </Button>
                        )}
                        <Offcanvas show={show} onHide={handleClose} placement="end" {...props}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Create A Product</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Product Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter product name"

                                            onChange={(e) => setProductName(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Product Description</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter product description"

                                            onChange={(e) => setProductDescription(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Product Price</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter product price"

                                            onChange={(e) => setProductPrice(e.target.value)}
                                        />
                                    </Form.Group>
                                    {/* Add more form fields for other product properties... */}
                                    <Button variant="primary" onClick={handleCreateProduct}>
                                        Create Product
                                    </Button>
                                </Form>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </div>
                    <div style={{ display: "flex", maxWidth: "800px", flexWrap: "wrap", height: "fit-content", border: "1px solid black", }}>
                        {props.clickedItem.products && props.clickedItem.products.length > 0 ? (
                            props.clickedItem.products.map(product => (
                                <Card key={product.id} style={{ maxWidth: '14rem', margin: "8px" }}>
                                    <Card.Img src="https://www.bing.com/th?id=OP.jEg7o%2fYqJQnaQw474C474&o=5&pid=21.1&w=130&h=176&qlt=100&dpr=1.5&bw=6&bc=FFFFFF&c=17" style={{ height: "230px" }} />
                                    <Card.Body>
                                        <Card.Title style={{ textAlign: "center" }}>{product.name}</Card.Title>
                                        <Card.Text style={{ textAlign: "center" }}>
                                            {product.description}
                                        </Card.Text>
                                        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                                            <Button onClick={() => handleDeleteRequest(product.id)} variant="primary">Delete</Button>
                                          
                                            <Button variant="primary" onClick={() => handleUpdateProductId(product.id)}>Update</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))
                        ) : (
                            <p>No products available for this category.</p>
                        )}
                    </div>
                </div>
                {/* Render your category data here */}
            </div>
        </>
    );
}

export default CategoryPage;