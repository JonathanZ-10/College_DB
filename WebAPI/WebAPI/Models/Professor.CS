namespace WebAPI.Models
{
    public class Professor
    {
        public string ProfessorID { get; set; } = null!;

        public string FirstName { get; set; } = String.Empty;

        public string LastName { get; set; } = String.Empty;

        public string PhotoFileName { get; set; } = String.Empty;
    }
}
