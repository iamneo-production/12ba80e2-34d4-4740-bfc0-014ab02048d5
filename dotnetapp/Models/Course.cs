using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace dotnetapp.Models
{
    public class Course
    {
        [Key]
        public int courseId { get; set; }
        [ForeignKey("instituteID")]
        public int instituteID { get; set; }
        public string courseName { get; set; }
        public int courseDuration { get; set; }
        public string courseDescription { get; set; }
        public string studentenrolled { get; set; }
        public string startTime { get; set; }
        public string endTime { get; set; }
        
    }
}