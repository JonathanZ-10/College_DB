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
    public class ProfessorController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public ProfessorController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _env = env;
            _configuration = configuration;
        }

        // Method for obtaining data information from Professor Table
        // Gives the ability to display table info on frontend
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                SELECT ProfessorID, FirstName, LastName,
                PhotoFileName FROM dbo.Professor";
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

        // Method to create a new professor, used in frontend (Add Professor Button)
        [HttpPost]
        public JsonResult Post(Professor pro)
        {
            string query = @"
                INSERT INTO dbo.Professor VALUES
                ('" + pro.ProfessorID + @"', '" + pro.FirstName + @"',
                '" + pro.LastName + @"', '" + pro.PhotoFileName + @"')";
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

        // Method to edit an existing professor, used in frontend (Edit Button)
        [HttpPut]
        public JsonResult Put(Professor pro)
        {
            string query = @"
                UPDATE dbo.Professor SET
                FirstName = '" + pro.FirstName + @"',
                LastName = '" + pro.LastName + @"',
                PhotoFileName = '" + pro.PhotoFileName + @"'
                where ProfessorID = '" + pro.ProfessorID + @"'
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
        [HttpDelete("{ProfessorID}")]
        public JsonResult Delete(string ProfessorID)
        {
            string query = @"
                DELETE FROM dbo.Professor
                WHERE ProfessorID = " + ProfessorID + @"
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
                    table.Load(myReader); 

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Deleted Successfully");
        }

        // Method to upload/save professor profile photo
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

                using (var stream = new FileStream(physicalPath, FileMode.Create))
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
