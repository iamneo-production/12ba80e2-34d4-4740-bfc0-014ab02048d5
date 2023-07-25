using System.ComponentModel.DataAnnotations;
namespace dotnetapp.Models{
    public class Login{
        [Key]
        public int Id { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string Token {get; set;}
    }
}