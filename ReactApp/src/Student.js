import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddStuModal} from './Modals/AddStuModal';
import {EditStuModal} from './Modals/EditStuModal';

export class Student extends Component
{
    // Main constructor
    constructor(props)
    {
        super(props);
        this.state={st:[], addModalShow:false, editModalShow:false}
    }

    // Method refreshing SQL table information
    refreshList()
    {
        fetch(process.env.REACT_APP_API+'student')
        .then(response=>response.json())
        .then(data=>
        {
            this.setState({st:data});
        });
    }

    // Invoked after component is mounted
    componentDidMount(){
        this.refreshList();
    }

    // Invoked after updating occurs
    componentDidUpdate(){
        this.refreshList();
    }

    /**
     * Deletes a specific course entry given StudentID
     * @param {*} stuid StudentID
     */
    deleteStu(stuid)
    {
        if(window.confirm('Are you sure you want to delete this student?'))
        {
            fetch(process.env.REACT_APP_API+'student/'+stuid,{
                method:'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'}
            })
        }
    }

    /**
     * Converts JSON format date to yyyy-mm-dd
     * @param {*} string JSON Date
     * @returns 
     */
    parseJsonDate(string)
    {
        return string.substring(0,10);
    }

    render()
    {
        // Set constants and Modal states
        const {st, stuid, fstName, lstName, enDate, gpa, photofilename}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});

        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>StudentID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Enrollment Date</th>
                            <th>GPA</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Adds table information for each column */}
                        {st.map(stu=>
                            <tr key={stu.StudentID}>
                                <td>{stu.StudentID}</td>
                                <td>{stu.FirstName}</td>
                                <td>{stu.LastName}</td>
                                <td>{this.parseJsonDate(stu.EnrollmentDate)}</td>
                                <td>{stu.GPA}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow:true,
                                            stuid:stu.StudentID,fstName:stu.FirstName,lstName:stu.LastName,
                                            enDate:stu.EnrollmentDate, gpa:stu.GPA, photofilename:stu.PhotoFileName})}>
                                            Edit
                                        </Button>
                                        
                                        <Button className="mr-2" variant="danger"
                                            onClick={()=>this.deleteStu(stu.StudentID)}>
                                                Delete
                                        </Button>
                                        
                                        {/* Initiates modal to edit student*/}
                                        <EditStuModal show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        stuid={stuid}
                                        fstName={fstName}
                                        lstName={lstName}
                                        enDate={enDate}
                                        gpa={gpa}
                                        photofilename={photofilename}
                                        />

                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                        Add Student
                    </Button>

                    <AddStuModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}