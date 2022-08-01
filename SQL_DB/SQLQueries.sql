CREATE DATABASE CollegeDB;

CREATE TABLE Student(
StudentID varchar(8),
FirstName varchar(20),
LastName varchar(20),
EnrollmentDate date,
GPA decimal(4,2),
PhotoFileName varchar(500)
);

INSERT INTO Student VALUES
('61245112', 'Jane', 'Doe', '2022-07-15', '4.0','default.png');

SELECT * FROM Student;

CREATE TABLE Professor(
ProfessorID varchar(8),
FirstName varchar(20),
LastName varchar(20),
PhotoFileName varchar(500)
);

INSERT INTO Professor VALUES
('11111111', 'John', 'Doe','default.png');

SELECT * FROM Professor;

CREATE TABLE Course(
CourseID varchar(8),
CourseName varchar(50),
ProfessorID varchar(8),
RoomNumber varchar(4)
);

INSERT INTO Course VALUES
('PHY2048', 'Physics', '11111111', '2100');

SELECT * FROM Course;
