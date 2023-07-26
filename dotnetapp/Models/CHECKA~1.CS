using System.ComponentModel.DataAnnotations;
namespace dotnetapp.Models
{
    public class checkAlreadyEnrolledCourse{
        public int userID{get; set;}
        public int courseID{get; set;}
    }
}