import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddCrsModal} from './Modals/AddCrsModal';
import {EditCrsModal} from './Modals/EditCrsModal';

export class Course extends Component
{
    // Main constructor
    constructor(props)
    {
        super(props);
        this.state={cors:[], addModalShow:false, editModalShow:false}
    }

    // Method refreshing SQL table information
    refreshList()
    {
        fetch(process.env.REACT_APP_API+'course')
        .then(response=>response.json())
        .then(data=>
        {
            this.setState({cors:data});
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
     * Deletes a specific course entry given CourseID
     * @param {*} crsid CourseID
     */
    deleteCrs(crsid)
    {
        if(window.confirm('Are you sure you want to delete this course?'))
        {
            fetch(process.env.REACT_APP_API+'course/'+crsid,{
                method:'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'}
            })
        }
    }

    render()
    {
        // Set constants and Modal states
        const {cors, crsid, crsName, prfId, roomNum}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});

        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Course ID</th>
                            <th>Course Name</th>
                            <th>Professor ID</th>
                            <th>Room Number</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* Adds table information for each column */}
                        {cors.map(crs=>
                            <tr key={crs.CourseID}>
                                <td>{crs.CourseID}</td>
                                <td>{crs.CourseName}</td>
                                <td>{crs.ProfessorID}</td>
                                <td>{crs.RoomNumber}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow:true,
                                            crsid:crs.CourseID,crsName:crs.CourseName,prfId:crs.ProfessorID,
                                            roomNum:crs.RoomNumber})}>
                                            Edit
                                        </Button>
                                        
                                        <Button className="mr-2" variant="danger"
                                            onClick={()=>this.deleteCrs(crs.CourseID)}>
                                            Delete
                                        </Button>
                                        
                                        {/* Initiates modal to edit course*/}
                                        <EditCrsModal show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        crsid={crsid}
                                        crsName={crsName}
                                        prfId={prfId}
                                        roomNum={roomNum}
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
                        Add Course
                    </Button>

                    <AddCrsModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}