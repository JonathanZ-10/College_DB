// Validates all inputs for the students tab when adding/editing a student
export function validateStuInput(event)
{
    var ID = event.target.StudentID.value;
    var FirstName = event.target.FirstName.value;
    var LastName = event.target.LastName.value;
    var GPA = event.target.GPA.value;
    var EnrollmentDate = event.target.EnrollmentDate.value;

    if (ID.length === 0)
    {
        alert('The Student ID field cannot be empty!');
        process.exit(1);
    }
    else if(isNaN(ID))
    {
        alert('The Student ID field must be composed of only numbers!');
        process.exit(1);
    }
    else if(ID.length !== 8)
    {
        alert('The StudentID must be 8 numbers long!');
        process.exit(1);
    }

    if (FirstName.indexOf(' ') >= 0)
    {
        alert('First Name field must contain no spaces!');
        process.exit(1);
    }
    else if(FirstName.length >= 20)
    {
        alert('First Name field is over 20 characters long');
        process.exit(1);
    }

    if (LastName.indexOf(' ') >= 0)
    {
        alert('Last Name field must contain no spaces!');
        process.exit(1);
    }
    else if(LastName.length >= 20)
    {
        alert('Last Name field is over 20 characters long');
        process.exit(1);
    }

    if (GPA > 4 || GPA < 0)
    {
        alert('GPA must be between 0.0 and 4.0');
        process.exit(1);
    }

    var year = EnrollmentDate.substring(0, 4);
    if (year < 1980)
    {
        alert('Our college was founded in 1980 please input a proper enrollment date');
        process.exit(1);
    }
    else if(year > 2022)
    {
        alert('The Enrollment Date field is past the current year');
        process.exit(1);
    }
}

// Validates all inputs for the professors tab when adding/editing a professor
export function validateProfInput(event)
{
    var ID = event.target.ProfessorID.value;

    if (ID.length === 0)
    {
        alert('Professor ID field cannot be empty!');
        process.exit(1);
    }
    else if(isNaN(ID))
    {
        alert('The Professor ID field must be composed of only numbers!');
        process.exit(1);
    }
    else if(ID.length !== 8)
    {
        alert('Professor ID must be 8 numbers long!');
        process.exit(1);
    }
}

// Validates all inputs for the courses tab when adding/editing a course
export function validateCrsInput(event)
{
    var ID = event.target.CourseID.value;
    var CourseName = event.target.CourseName.value;
    var RoomNumber = event.target.RoomNumber.value;

    if (ID.length === 0)
    {
        alert('Course ID field cannot be empty!');
        process.exit(1);
    }
    else if(ID.length > 8)
    {
        alert('Course ID cannot be more than 8 characters long!');
        process.exit(1);
    }

    if (CourseName.length > 50)
    {
        alert('Course Name cannot be more than 50 characters long!');
        process.exit(1);
    }

    if (isNaN(RoomNumber))
    {
        alert('Room Number must be composed of only numbers');
        process.exit(1);
    }
    else if (RoomNumber < 1 || RoomNumber > 9999 )
    {
        alert('Room Number must be a numberical value between 1 and 9999');
        process.exit(1);
    }

}
