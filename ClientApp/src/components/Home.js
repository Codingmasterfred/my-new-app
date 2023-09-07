import React  from 'react';
import Nav from "./NavMenu"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import SecondNavBar from "./SecondNavBar"
function Home(props) {
    console.log(props.Category.products )
    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100vh"}} >
            <Nav />
            <div style={{ display: "flex",  width:"100%" }}>
                <SecondNavBar
                    setClickedItem={props.setClickedItem} Category={props.Category} setCategories={props.setCategories} ClickedItem={props.ClickedItem}/>
           
                <div id="NweDiv" style={{ display: "flex" }}>
               
                    {props.Category.map(category => (
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
                    ))}
            </div>
            </div>
            </div>
    )
}

export default Home;
