using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;
using Microsoft.AspNetCore.Hosting;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public StudentController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        // Method for obtaining data information from Student Table
        // Gives the ability to display table info on frontend
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                SELECT StudentID, FirstName, LastName,
                EnrollmentDate, GPA, PhotoFileName FROM dbo.Student";
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

        // Method to create a new student, used in frontend (Add Professor Button)
        [HttpPost]
        public JsonResult Post(Student stu)
        {
            string query = @"
                INSERT INTO dbo.Student VALUES
                ('" + stu.StudentID + @"', '" + stu.FirstName + @"',
                '" + stu.LastName + @"', '" + stu.EnrollmentDate + @"',
                '" + stu.GPA + @"', '" + stu.PhotoFileName + @"')";
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

        // Method to edit an existing student, used in frontend (Edit Button)
        [HttpPut]
        public JsonResult Put(Student stu)
        {
            string query = @"
                UPDATE dbo.Student SET
                FirstName = '" + stu.FirstName+@"',
                LastName = '"+stu.LastName+@"',
                EnrollmentDate = '"+stu.EnrollmentDate+@"',
                GPA = '"+stu.GPA+@"',
                PhotoFileName = '"+stu.PhotoFileName+ @"'
                WHERE StudentID = '" + stu.StudentID + @"'
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

        // Method to delete professor, used in frontend (Delete Button)
        [HttpDelete("{StudentID}")]
        public JsonResult Delete(string StudentID)
        {
            string query = @"
                DELETE FROM dbo.Student
                WHERE StudentID = " + StudentID + @"
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

        // Method to upload/save student profile photo
        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using(var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult("Succesfully uploaded " + filename);
            }
            catch (Exception)
            {
                return new JsonResult("An exception has been found!");
            }
        }
    }
}
