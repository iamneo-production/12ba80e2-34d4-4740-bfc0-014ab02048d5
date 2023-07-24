using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
namespace dotnetapp.Models
{
    public class Institute
    {
        [Key]
        public int instituteId { get; set; }
        public string instituteName { get; set; }
        public string instituteDescription { get; set; }
        public string instituteAddress { get; set; }
        public string mobile { get; set; }
        public string email { get; set; }
        public string image { get; set; }
        public int rating { get; set; }
        public int userGiveRating { get; set; }
        public double averageRating { get; set; }
    }
}