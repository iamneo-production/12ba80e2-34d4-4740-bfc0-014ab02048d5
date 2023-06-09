using System.ComponentModel.DataAnnotations;
namespace WebApp.Models
{
    public class User{
        [Key]
        public int Id {get; set;}
        public string email {get; set;}
        public string password {get; set;}
        public string username {get; set;}
        public string mobileNumber {get; set;}
        public string userRole {get; set;}
        public string confirmPassword {get; set;}
        public string Token {get; set;}

    }
}