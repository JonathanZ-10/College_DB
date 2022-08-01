import React,{Component} from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';

export class Navigation extends Component
{
    render()
    {
        return(
            <Navbar bg="dark" variant="dark">
                <Container fluid>
                <Nav>
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/students">Students</Nav.Link>
                    <Nav.Link href="/professors">Professors</Nav.Link>
                    <Nav.Link href="/courses">Courses</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
        )
    }
}
