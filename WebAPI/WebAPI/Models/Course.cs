namespace WebAPI.Models
{
    public class Course
    {
        public string CourseID { get; set; } = null!;

        public string CourseName { get; set; } = String.Empty;

        public string ProfessorID { get; set; } = String.Empty;

        public string RoomNumber { get; set; } = String.Empty;
    }
}
