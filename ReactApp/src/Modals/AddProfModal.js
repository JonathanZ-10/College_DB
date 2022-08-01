import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form, Image} from 'react-bootstrap';
import {validateProfInput} from '../ValidateInput';

export class AddProfModal extends Component
{
    // Main constructor
    constructor(props){
        super(props);
        this.state={prof:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    photofilename = "default.png";
    imagesrc = process.env.REACT_APP_PHOTOPATH+this.photofilename;

    /**
     * Handles submission of a new Professor to the table
     * @param {*} event 
     */
    handleSubmit(event)
    {
        validateProfInput(event);
        fetch(process.env.REACT_APP_API+'professor',
        {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ProfessorID:event.target.ProfessorID.value,
                FirstName:event.target.FirstName.value,
                LastName:event.target.LastName.value,
                PhotoFileName:this.photofilename
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

    /**
     * Handles the submission of a new professor photo
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

        fetch(process.env.REACT_APP_API+'Professor/SaveFile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;
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
                            Add Student
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            {/* Form setup for each input > Adding a new Professor*/}
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="ProfessorID">
                                        <Form.Label>ProfessorID</Form.Label>
                                        <Form.Control type="text" name="ProfessorID"/>
                                    </Form.Group>

                                    <Form.Group controlId="FirstName">
                                        <Form.Label>FirstName</Form.Label>
                                        <Form.Control type="text" name="FirstName"/>
                                    </Form.Group>

                                    <Form.Group controlId="LastName">
                                        <Form.Label>LastName</Form.Label>
                                        <Form.Control type="text" name="LastName"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Professor
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