using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApp.Models
{
    public class Student
    {
        [Key]
        public int id { get; set; }
        [ForeignKey("courseID")]
        public int courseID { get; set; }
        [ForeignKey("userID")]
        public int userID { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string gender { get; set; }
        public string fathername { get; set; }
        public string phonenumber { get; set; }
        public string alternatenumber { get; set; }
        public string mothername { get; set; }
        public string email { get; set; }
        public string age { get; set; }
        public string housenumber { get; set; }
        public string street { get; set; }
        public string area { get; set; }
        public string passcode { get; set; }
        public string state { get; set; }
        public string nationality { get; set; }
        public string joiningDate { get; set; }
        public string endDate { get; set; }
    }
}