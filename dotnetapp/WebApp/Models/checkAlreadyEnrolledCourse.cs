using System.ComponentModel.DataAnnotations;
namespace WebApp.Models
{
    public class checkAlreadyEnrolledCourse{
        public int userID{get; set;}
        public int courseID{get; set;}
    }
}