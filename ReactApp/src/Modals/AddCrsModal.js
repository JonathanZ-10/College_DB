import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import {validateCrsInput} from '../ValidateInput';

export class AddCrsModal extends Component{
    // Main constructor
    constructor(props){
        super(props);
        this.state={cors:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    /**
     * Handles submission of a new course to the table
     * @param {*} event 
     */
    handleSubmit(event)
    {
        validateCrsInput(event);
        fetch(process.env.REACT_APP_API+'course',
        {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                CourseID: event.target.CourseID.value,
                CourseName:event.target.CourseName.value,
                ProfessorID:event.target.ProfessorID.value,
                RoomNumber:event.target.RoomNumber.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }

    render()
    {
        return(
            <div className="container">
                <Modal {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Course
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            {/* Form setup for each input > Adding a new course*/}
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="CourseID">
                                        <Form.Label>CourseID</Form.Label>
                                        <Form.Control type="text" name="CourseID"/>
                                    </Form.Group>

                                    <Form.Group controlId="CourseName">
                                        <Form.Label>CourseName</Form.Label>
                                        <Form.Control type="text" name="CourseName"/>
                                    </Form.Group>

                                    <Form.Group controlId="ProfessorID">
                                        <Form.Label>ProfessorID</Form.Label>
                                        <Form.Control type="text" name="ProfessorID"/>
                                    </Form.Group>

                                    <Form.Group controlId="RoomNumber">
                                        <Form.Label>RoomNumber</Form.Label>
                                        <Form.Control type="text" name="RoomNumber"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Course
                                        </Button> 
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}