import React,{Component} from 'react';

export class Home extends Component
{
    render()
    {
        return(
            <div className="mt-5 d-flex justify-content-left">
                This website represents the foundation for a basic college database with specific student, course, and professor tabs. <br/><br/>
                Created using: React, NodeJS, SQL Server, VS Studio, VS Code<br/>
                Programming Languages: C#, SQL, Javascript<br/>
                Project Length: 1 week
                
                <br/><br/>The following are the requirements for each section.<br/><br/>

                Student:<br/>
                *StudentID (Required): No Spaces, Only 8 Characters, Numbers only <br/>
                *FirstName: No Spaces, 20 Characters max <br/>
                *LastName: No Spaces, 20 Characters max <br/>
                *EnrollmentDate: Must be between 1980 and 2022 <br/>
                *GPA: Must be between 0.0 and 4.0 <br/><br/>

                Professor:<br/>
                *ProfessorID (Required): No Spaces, Only 8 Characters, Numbers only <br/>
                *FirstName: No Spaces, 20 Characters max <br/>
                *LastName: No Spaces, 20 Characters max <br/><br/>

                Courses: <br/>
                *CourseID (Required): No Spaces, 8 Characters Max <br/>
                *CourseName: 50 Character Max <br/>
                *ProfessorID: No Spaces, Only 8 Characters, Numbers only, must be a valid ID <br/>
                *RoomNumber: Numbers only, Must be between 1-9999



                
                
            </div>
        )
    }
}