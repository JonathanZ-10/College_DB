import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form, Image} from 'react-bootstrap';
import {validateStuInput} from '../ValidateInput';

export class AddStuModal extends Component
{
    // Main constructor
    constructor(props){
        super(props);
        this.state={st:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    // Vars for photo path
    photofilename = "default.png";
    imagesrc = process.env.REACT_APP_PHOTOPATH+this.photofilename;


    /**
     * Handles submission of a new student to the table
     * @param {*} event 
     */
    handleSubmit(event)
    {
        validateStuInput(event);
        fetch(process.env.REACT_APP_API+'student',
        {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                StudentID:event.target.StudentID.value,
                FirstName:event.target.FirstName.value,
                LastName:event.target.LastName.value,
                EnrollmentDate:event.target.EnrollmentDate.value,
                GPA:event.target.GPA.value,
                PhotoFileName:this.photofilename
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Submit Failed');
        })
    }

    /**
     * Handles the submission of a new student photo
     * @param {*} event 
     */
    handleFileSelected(event)
    {
        this.photofilename=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API+'Student/SaveFile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;
        },
        (error)=>{
            alert('File Upload Failed');
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
                            Add Student
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            {/* Form setup for each input > Adding a new student*/}
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="StudentID">
                                        <Form.Label>StudentID</Form.Label>
                                        <Form.Control type="text" name="StudentID"/>
                                    </Form.Group>

                                    <Form.Group controlId="FirstName">
                                        <Form.Label>FirstName</Form.Label>
                                        <Form.Control type="text" name="FirstName"/>
                                    </Form.Group>

                                    <Form.Group controlId="LastName">
                                        <Form.Label>LastName</Form.Label>
                                        <Form.Control type="text" name="LastName"/>
                                    </Form.Group>

                                    <Form.Group controlId="EnrollmentDate">
                                        <Form.Label>EnrollmentDate</Form.Label>
                                        <Form.Control type="date" name="EnrollmentDate"
                                        data-date-format="YYYY/MM/DD"/>
                                    </Form.Group>

                                    <Form.Group controlId="GPA">
                                        <Form.Label>GPA</Form.Label>
                                        <Form.Control type="text" name="GPA"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Student
                                        </Button> 
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col sm={6}>
                                <Image width="200px" height="200px" src={this.imagesrc}/>
                                <input onChange={this.handleFileSelected} type="File"/>
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