import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import {validateCrsInput} from '../ValidateInput';

export class EditCrsModal extends Component
{
    // Main constructor
    constructor(props){
        super(props);
        this.state={crs:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    /**
     * Handles the editing of an existing course
     * @param {*} event 
     */
    handleSubmit(event)
    {
        validateCrsInput(event);
        fetch(process.env.REACT_APP_API+'course',
        {
            method: 'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                CourseID:event.target.CourseID.value,
                CourseName:event.target.CourseName.value,
                ProfessorID:event.target.ProfessorID.value,
                RoomNumber:event.target.RoomNumber.value,
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
                            Edit Course
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            {/* Form setup for each input > Editing an existing student*/}
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="CourseID">
                                        <Form.Label>Course ID</Form.Label>
                                        <Form.Control type="text" name="CourseID"
                                        defaultValue={this.props.crsid} readOnly/>
                                    </Form.Group>

                                    <Form.Group controlId="CourseName">
                                        <Form.Label>Course Name</Form.Label>
                                        <Form.Control type="text" name="CourseName"
                                        defaultValue={this.props.crsName}/>
                                    </Form.Group>

                                    <Form.Group controlId="ProfessorID">
                                        <Form.Label>Professor ID</Form.Label>
                                        <Form.Control type="text" name="ProfessorID"
                                        defaultValue={this.props.prfId}/>
                                    </Form.Group>

                                    <Form.Group controlId="RoomNumber">
                                        <Form.Label>Room Number</Form.Label>
                                        <Form.Control type="text" name="RoomNumber"
                                        defaultValue={this.props.roomNum}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Confirm
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