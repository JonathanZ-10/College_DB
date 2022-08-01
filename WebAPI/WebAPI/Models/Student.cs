namespace WebAPI.Models
{
    public class Student
    {
        public string StudentID { get; set; } = null!;

        public string FirstName { get; set; } = String.Empty;

        public string LastName { get; set; } = String.Empty;

        public string EnrollmentDate { get; set; } = String.Empty;

        public double GPA { get; set; }

        public string PhotoFileName { get; set; } = String.Empty;
    }
}
