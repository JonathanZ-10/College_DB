using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;


namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public CourseController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // Method for obtaining data information from Course Table
        // Gives the ability to display table info on frontend
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                SELECT CourseID, CourseName, ProfessorID,
                RoomNumber FROM dbo.Course";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StudentAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        // Method to create a new course, used in frontend (Add Course)
        [HttpPost]
        public JsonResult Post(Course crs)
        {
            string query = @"
                INSERT INTO dbo.Course VALUES
                ('" + crs.CourseID + @"', '" + crs.CourseName + @"',
                '" + crs.ProfessorID + @"', '" + crs.RoomNumber + @"')";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StudentAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }

        // Method to edit an existing course, used in frontend (edit button)
        [HttpPut]
        public JsonResult Put(Course crs)
        {
            string query = @"
                UPDATE dbo.Course SET
                CourseName = '" + crs.CourseName + @"',
                ProfessorID = '" + crs.ProfessorID + @"',
                RoomNumber = '" + crs.RoomNumber + @"'
                WHERE CourseID = '" + crs.CourseID + @"'
                ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StudentAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Updated Successfully");
        }

        // Method to delete course, used in frontend (delete button)
        [HttpDelete("{CourseID}")]
        public JsonResult Delete(string CourseID)
        {
            string query = @"
                DELETE FROM dbo.Course
                WHERE CourseID = '" + CourseID + "'" + @"
                ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StudentAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Deleted Successfully");
        }
    }
}
