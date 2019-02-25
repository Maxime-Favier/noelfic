import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Link from 'react-router-dom/Link'
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
//import LinkContainer from 'react-bootstrap/Lin'
/*import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'*/

import logo from '../img/noelfic.png'


const navbar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Link to="/">
                <Navbar.Brand>
                    <img alt="logo de noelfic.fr" src={logo} width="35" height="30"
                         className="d-inline-block align-top"/>
                    {' Noelfic'}
                </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to={"/oldfic"} ><Nav.Link>Anciennes fic</Nav.Link></LinkContainer>
                    <Nav.Link disabled={true}>Risitas</Nav.Link>
                    <Nav.Link disabled={true}>Nouvelles fic</Nav.Link>
                </Nav>
                {/*<Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                    <Button variant="outline-info">Search</Button>
                </Form>*/}
            </Navbar.Collapse>
        </Navbar>

    );

};
export default navbar;