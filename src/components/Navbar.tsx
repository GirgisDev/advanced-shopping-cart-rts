import React from 'react'
import { Button, Container, Nav, Navbar as NavbarBs } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { UseShoppingCart } from './../context/ShoppingCartContext';

const Navbar = () => {
  const { openCart, cartQuantity } = UseShoppingCart();
  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>Home</Nav.Link>
          <Nav.Link to="/store" as={NavLink}>Store</Nav.Link>
          <Nav.Link to="/about" as={NavLink}>About</Nav.Link>
        </Nav>
        {cartQuantity > 0 ? (
          <Button 
            onClick={openCart}
            style={{ width: "3rem", height: "3rem", position: "relative" }}
            variant="outline-primary" className="rounded-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 256 256">
              <rect fill="currentColor"/>
                <path fill="currentColor" d="M96,216a16,16,0,1,1-16-16A16,16,0,0,1,96,216Zm88-16a16,16,0,1,0,16,16A16,16,0,0,0,184,200ZM228.1,67.2a8.1,8.1,0,0,0-6.4-3.2H48.3L40.2,35.6A16.1,16.1,0,0,0,24.8,24H8A8,8,0,0,0,8,40H24.8l9.8,34.1v.2L61,166.6A24.1,24.1,0,0,0,84.1,184h95.8A24.1,24.1,0,0,0,203,166.6l26.4-92.4A8,8,0,0,0,228.1,67.2Z"/>
            </svg>
            <div 
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
              style={{ 
                color: "#FFF", 
                width: "1.3rem", 
                height: "1.3rem", 
                position: "absolute", 
                bottom: -6, right: -6,
                fontSize: ".9rem",
                transform: "translate(-25%, -25%)"
              }}
            >
              {cartQuantity}
            </div>
          </Button>
        ) : null}
      </Container>
    </NavbarBs>
  )
}

export default Navbar