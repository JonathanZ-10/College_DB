import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddProfModal} from './Modals/AddProfModal';
import {EditProfModal} from './Modals/EditProfModal';

export class Professor extends Component
{
    // Main constructor
    constructor(props)
    {
        super(props);
        this.state={prof:[], addModalShow:false, editModalShow:false}
    }

    // Method refreshing SQL table information
    refreshList()
    {
        fetch(process.env.REACT_APP_API+'professor')
        .then(response=>response.json())
        .then(data=>
        {
            this.setState({prof:data});
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
     * Deletes a specific course entry given ProfessorID
     * @param {*} profid Professor
     */
    deleteProf(profid)
    {
        if(window.confirm('Are you sure you want to delete this professor?'))
        {
            fetch(process.env.REACT_APP_API+'professor/'+profid,{
                method:'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'}
            })
        }
    }

    render()
    {
        // Set constants and Modal states
        const {prof, profid, fstName, lstName, photofilename}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});

        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Professor ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Adds table information for each column */}
                        {prof.map(prf=>
                            <tr key={prf.ProfessorID}>
                                <td>{prf.ProfessorID}</td>
                                <td>{prf.FirstName}</td>
                                <td>{prf.LastName}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow:true,
                                            profid:prf.ProfessorID,fstName:prf.FirstName,lstName:prf.LastName,
                                            photofilename:prf.PhotoFileName})}>
                                            Edit
                                        </Button>
                                        
                                        <Button className="mr-2" variant="danger"
                                            onClick={()=>this.deleteProf(prf.ProfessorID)}>
                                            Delete
                                        </Button>
                                        
                                        {/* Initiates modal to edit professor*/}
                                        <EditProfModal show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        profid={profid}
                                        fstName={fstName}
                                        lstName={lstName}
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
                        Add Professor
                    </Button>

                    <AddProfModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}