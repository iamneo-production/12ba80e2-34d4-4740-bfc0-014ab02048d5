using Microsoft.EntityFrameworkCore;
using WebApp.Models;
namespace WebApp.Context{
    public class AppDbContext: DbContext{
        public AppDbContext(DbContextOptions<AppDbContext> options):base(options){

        }
        public DbSet<User> Users{get; set;}
        public DbSet<Admin> Admins{get; set;}
        public DbSet<Course> Courses{get; set;}
        public DbSet<Institute> Institutes{get; set;}
        public DbSet<Login> Logins{get; set;}
        public DbSet<Student> Students{get; set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<Admin>().ToTable("admins");
            modelBuilder.Entity<Course>().ToTable("courses");
            modelBuilder.Entity<Institute>().ToTable("institutes");
            modelBuilder.Entity<Login>().ToTable("logins");
            modelBuilder.Entity<Student>().ToTable("students");
        }
    }
}